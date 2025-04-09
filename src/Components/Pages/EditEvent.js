import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({ title: "", venue: "", startDate: "", endDate: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) {
        console.error("No event ID provided.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, event);
      alert("Event updated successfully!");
      navigate("/ManageEvents");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (loading) return <p>Loading event details...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title:</label>
        <input type="text" name="title" value={event.title} onChange={handleChange} className="border p-2 w-full mb-4" required />

        <label className="block mb-2">Venue:</label>
        <input type="text" name="venue" value={event.venue} onChange={handleChange} className="border p-2 w-full mb-4" required />

        <label className="block mb-2">Start Date:</label>
        <input type="date" name="startDate" value={event.startDate?.split("T")[0]} onChange={handleChange} className="border p-2 w-full mb-4" required />

        <label className="block mb-2">End Date:</label>
        <input type="date" name="endDate" value={event.endDate?.split("T")[0]} onChange={handleChange} className="border p-2 w-full mb-4" required />

        <label className="block mb-2">Event Image:</label>
        {event.imageUrl && <img src={event.imageUrl} alt="Event" className="w-full h-40 object-cover mb-4 rounded" />}
        <input type="text" name="imageUrl" value={event.imageUrl} onChange={handleChange} className="border p-2 w-full mb-4" placeholder="Enter Image URL" />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
}
