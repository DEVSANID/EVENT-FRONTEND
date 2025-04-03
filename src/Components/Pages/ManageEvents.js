import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading events...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Manage Events</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-purple-500 text-white text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Venue</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Image</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event._id} className="border-b hover:bg-gray-100">
                  <td className="p-3 font-medium text-gray-700">{event.title}</td>
                  <td className="p-3 text-gray-600">{event.venue}</td>
                  <td className="p-3 text-gray-600">{new Date(event.startDate).toLocaleDateString()}</td>
                  <td className="p-3 text-gray-600">{new Date(event.endDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt="Event" className="w-24 h-14 object-cover rounded-md shadow" />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="p-3 flex justify-center space-x-3">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded shadow-md hover:bg-blue-600 transition"
                      onClick={() => handleEdit(event._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded shadow-md hover:bg-red-600 transition"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500 font-medium">No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
