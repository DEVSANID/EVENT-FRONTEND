import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error' | 'confirm', text: string }
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setMessage({ type: "error", text: "Failed to fetch events." });
        setLoading(false);
      });
  }, []);

  const confirmDelete = (eventId) => {
    setPendingDeleteId(eventId);
    setMessage({ type: "confirm", text: "Are you sure you want to delete this event?" });
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
    setMessage(null);
  };

  const proceedDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${pendingDeleteId}`);
      setEvents(events.filter((event) => event._id !== pendingDeleteId));
      setMessage({ type: "success", text: "Event deleted successfully." });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete event." });
    }
    setPendingDeleteId(null);
  };

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  if (loading) return <p className="text-center text-xl font-semibold mt-20">Loading events...</p>;

  return (
    <div className="p-6 bg-gradient-to-br from-purple-100 to-white min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-purple-700 drop-shadow">
        Manage Events
      </h2>

      {/* Alert Message Box */}
      {message && (
        <div
          className={`max-w-2xl mx-auto mb-6 rounded-lg px-5 py-4 text-sm font-medium shadow-md flex justify-between items-center
            ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : message.type === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-yellow-100 text-yellow-800 border border-yellow-300"
            }
          `}
        >
          <span>{message.text}</span>
          {message.type === "confirm" ? (
            <div className="space-x-2 ml-4">
              <button
                onClick={proceedDelete}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 text-sm"
              >
                No
              </button>
            </div>
          ) : (
            <button onClick={() => setMessage(null)} className="text-sm underline ml-4">
              Close
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl p-6 border border-gray-200">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-4 text-sm font-semibold text-left">Title</th>
              <th className="p-4 text-sm font-semibold text-left">Venue</th>
              <th className="p-4 text-sm font-semibold text-left">Start Date</th>
              <th className="p-4 text-sm font-semibold text-left">End Date</th>
              <th className="p-4 text-sm font-semibold text-left">Image</th>
              <th className="p-4 text-sm font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event._id} className="hover:bg-purple-50 border-b last:border-none">
                  <td className="p-4 font-medium text-gray-800">{event.title}</td>
                  <td className="p-4 text-gray-600">{event.venue}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(event.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(event.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt="Event"
                        className="w-24 h-14 object-cover rounded-md border border-gray-300 shadow-sm"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 shadow-sm transition"
                      onClick={() => handleEdit(event._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 shadow-sm transition"
                      onClick={() => confirmDelete(event._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500 font-medium">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
