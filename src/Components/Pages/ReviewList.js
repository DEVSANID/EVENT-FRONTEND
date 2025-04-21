import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { FaStar } from "react-icons/fa";

const ReviewList = ({ reviews }) => {
  const { darkMode } = useContext(DarkModeContext);

  if (!reviews || reviews.length === 0) {
    return (
      <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>No reviews yet</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      {reviews.map((review) => (
        <div
          key={review._id}
          className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"} shadow-sm`}
        >
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                  size={16}
                />
              ))}
            </div>
            <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {review.userName || review.user?.name || "Anonymous"}
            </span>
            <span className={`mx-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>•</span>
            <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;