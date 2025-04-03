import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const bookingId = query.get("bookingId");
    const sessionId = query.get("session_id");

    const confirmBooking = async () => {
      try {
        // Update booking status in database
        const response = await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
          status: "confirmed",
          paymentId: sessionId,
        });
        
        setBooking(response.data);
      } catch (err) {
        setError("Failed to confirm booking. Please contact support.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId && sessionId) {
      confirmBooking();
    } else {
      setError("Invalid booking confirmation");
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return <div className="text-center py-10">Confirming your booking...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Booking Confirmed!
          </h2>
          {booking && (
            <div className="mt-4 text-left space-y-2">
              <p>
                <span className="font-semibold">Event:</span> {booking.eventId.title}
              </p>
              <p>
                <span className="font-semibold">Booking ID:</span> {booking._id}
              </p>
              <p>
                <span className="font-semibold">Tickets:</span> {booking.tickets}
              </p>
              <p>
                <span className="font-semibold">Total Paid:</span> ${(booking.eventId.price * booking.tickets).toFixed(2)}
              </p>
            </div>
          )}
          <div className="mt-8">
            <button
              onClick={() => navigate("/")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;