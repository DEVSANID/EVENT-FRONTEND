import React, { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ targetType, eventId, onReviewSubmit }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    if (!user) {
      setError("You must be logged in to submit a review.");
      setIsSubmitting(false);
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      setIsSubmitting(false);
      return;
    }

    if (comment.trim() === "") {
      setError("Please write your review");
      setIsSubmitting(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/reviews",
        {
          rating,
          comment,
          targetType,
          eventId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onReviewSubmit(data);
      setRating(0);
      setComment("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to submit review"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg max-w-2xl mx-auto ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-xl font-bold mb-5">Write a Review</h3>

      {/* Show login message if not logged in */}
      {!user && (
        <div className="mb-5 p-3 rounded-lg bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          You must be logged in to write a review.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="flex mb-5 gap-1">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label
                key={i}
                className="transition-transform transform hover:scale-110 duration-150"
                aria-label={`Rate ${ratingValue} out of 5`}
              >
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                  aria-checked={ratingValue === rating}
                  disabled={!user}
                />
                <FaStar
                  className={`cursor-pointer ${!user ? "opacity-50" : ""}`}
                  size={28}
                  color={
                    ratingValue <= (hover || rating) ? "#facc15" : "#d1d5db"
                  }
                  onMouseEnter={() => user && setHover(ratingValue)}
                  onMouseLeave={() => user && setHover(null)}
                  aria-label={`${ratingValue} star`}
                />
              </label>
            );
          })}
        </div>

        {/* Comment Input */}
        <textarea
          className={`w-full p-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition ${
            darkMode
              ? "bg-gray-700 text-white placeholder-gray-400"
              : "bg-gray-100 text-black placeholder-gray-500"
          } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
          rows="4"
          placeholder={user ? "Share your experience..." : "Please login to write a review"}
          value={comment}
          onChange={(e) => user && setComment(e.target.value)}
          aria-label="Review comment"
          minLength="10"
          maxLength="500"
          disabled={!user}
        />

        {/* Character count */}
        {user && (
          <p className={`text-xs mt-1 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            {comment.length}/500 characters
          </p>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-3 p-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mt-3 p-3 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Review submitted successfully!
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || comment.length < 10 || !user}
          className={`mt-4 w-full py-3 rounded-lg font-semibold transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : !user || comment.length < 10
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
          } text-white`}
          aria-label="Submit review"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;