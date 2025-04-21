import React, { useState } from "react";

const ReviewsSection = ({ reviews, darkMode }) => {
  const BATCH_SIZE = 4;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + BATCH_SIZE);
  };

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <div className="mt-16 px-4 sm:px-6">
      <h3 className="text-2xl font-bold mb-8 text-center">
        What others are <span className="text-primary">saying</span>
      </h3>

      {reviews.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {visibleReviews.map((r) => (
              <div
                key={r._id}
                className={`relative p-6 rounded-2xl shadow-md transition duration-300 border ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-700 hover:shadow-purple-500/30"
                    : "bg-white text-black border-gray-200 hover:shadow-md"
                }`}
              >
                {/* Avatar */}
                <div className="absolute -top-5 left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm shadow-lg">
                  {r.user?.[0]?.toUpperCase() || "U"}
                </div>

                <p className="mt-4 italic text-sm leading-relaxed">"{r.review}"</p>

                <div className="mt-4 flex justify-between items-center text-sm font-medium">
                  <span className="text-primary">{r.user}</span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    {[...Array(5 - r.rating)].map((_, i) => (
                      <span key={i} className="text-gray-400">★</span>
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                Other Reviews
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsSection;
