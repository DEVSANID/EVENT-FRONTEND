import { useEffect, useState } from "react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setError("Admin not authenticated.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/admin/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        setBookings(data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDelete = async (bookingId) => {
    setMessage("");

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      setMessage("Booking deleted successfully.");
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("Failed to delete booking.");
    }
  };

  const cancelDelete = () => setConfirmDeleteId(null);

  if (loading) return <div className="text-center mt-6 text-gray-500">Loading bookings...</div>;

  if (error) return <div className="text-center mt-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

      {message && (
        <div
          className={`mb-4 text-sm text-center transition-opacity duration-500 ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="text-gray-600 text-center">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Event</th>
                <th className="p-3 border">User Email</th>
                <th className="p-3 border">Payment ID</th>
                <th className="p-3 border">Booking Date</th>
                <th className="p-3 border">Ticket</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{booking.eventName || "N/A"}</td>
                  <td className="p-3 border">{booking.userEmail || "N/A"}</td>
                  <td className="p-3 border">{booking.paymentId || "N/A"}</td>
                  <td className="p-3 border">
                    {booking.createdAt
                      ? new Date(booking.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="p-3 border">
                    {booking.ticket ? (
                      <a
                        href={`http://localhost:5000${booking.ticket}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-gray-400">Not uploaded</span>
                    )}
                  </td>
                  <td className="p-3 border text-center">
                    {confirmDeleteId === booking._id ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="text-red-600 hover:underline"
                        >
                          Yes
                        </button>
                        <button
                          onClick={cancelDelete}
                          className="text-gray-500 hover:underline"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(booking._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
