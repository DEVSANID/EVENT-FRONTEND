import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext"; // Import DarkModeContext

const CreateEvents = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext); // Use DarkModeContext

  const [eventData, setEventData] = useState({
    title: "",
    venue: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventData.title || !eventData.venue || !eventData.startTime || !eventData.endTime ||
        !eventData.startDate || !eventData.endDate || !eventData.description) {
      alert("All fields except image are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("venue", eventData.venue);
    formData.append("startTime", eventData.startTime);
    formData.append("endTime", eventData.endTime);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("description", eventData.description);
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/events/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Event created successfully!");
        setEventData({
          title: "",
          venue: "",
          startTime: "",
          endTime: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        setImageFile(null);

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"} flex flex-col items-center p-6`}>
      <header className={`w-full max-w-[1200px] h-auto min-h-[49px] mx-auto flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 ${darkMode ? "bg-gray-800" : "bg-white"} mt-4 sm:mt-6`}>
        <Link to="/" className={`text-2xl sm:text-[40px] font-sans font-bold mb-3 sm:mb-0 ${darkMode ? "text-white" : "text-black"}`}>
          Event <span className="text-primary">Hive</span>
        </Link>

        <div>
          {user ? (
            <button onClick={logout} className={`mr-2 sm:text-[16px] sm:mr-4 font-sans ${darkMode ? "text-white" : "text-black"} px-4 sm:px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200`}>
              Logout
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className={`mr-2 sm:text-[16px] sm:mr-4 font-sans ${darkMode ? "text-white" : "text-black"} px-4 sm:px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200`}>
                Login
              </button>
              <button onClick={() => navigate('/signup')} className={`bg-primary sm:text-[16px] font-sans text-white px-4 sm:px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200`}>
                Signup
              </button>
            </>
          )}
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className={`w-full max-w-4xl ${darkMode ? "bg-green-900 text-green-100" : "bg-green-100 text-green-700"} p-4 mb-4 rounded-md text-center`}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={`w-full max-w-4xl ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} p-8 rounded-lg shadow-md`}>
        <h2 className="text-2xl font-bold text-center mb-6">Create Event</h2>

        <div className="space-y-4">
          <label className="block font-semibold">Event Title</label>
          <input type="text" name="title" value={eventData.title} onChange={handleChange} className={`w-full p-3 border rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} required />

          <label className="block font-semibold">Event Venue</label>
          <input type="text" name="venue" value={eventData.venue} onChange={handleChange} className={`w-full p-3 border rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Start Time</label>
              <input type="time" name="startTime" value={eventData.startTime} onChange={handleChange} className={`w-full p-3 border rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} required />
            </div>
            <div>
              <label className="block font-semibold">End Time</label>
              <input type="time" name="endTime" value={eventData.endTime} onChange={handleChange} className={`w-full p-3 border rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} required />
            </div>
            <div>
              <label className="block font-semibold">Start Date</label>
              <input type="date" name="startDate" value={eventData.startDate} onChange={handleChange} className={`w-full p-3 border rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} required />
            </div>
            <div>
              <label className="block font-semibold">End Date</label>
              <input type="date" name="endDate" value={eventData.endDate} onChange={handleChange} className={`w-full p-3 border rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} required />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4 text-center">Event Description</h2>
        <textarea name="description" value={eventData.description} onChange={handleChange} className={`w-full p-3 border rounded-md h-24 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} required></textarea>

        {/* Image Upload */}
        <h2 className="text-xl font-semibold mt-6 mb-4 text-center">Upload Event Image</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} className={`w-full p-3 border rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} />

        <button type="submit" className="w-full mt-6 p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvents;