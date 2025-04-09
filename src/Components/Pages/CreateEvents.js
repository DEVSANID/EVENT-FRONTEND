import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

const CreateEvents = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    if (!eventData.title || !eventData.venue || !eventData.startTime || !eventData.endTime ||
        !eventData.startDate || !eventData.endDate || !eventData.description) {
      alert("All fields except image are required");
      setIsSubmitting(false);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 w-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} hover:text-primary transition-colors`}>
            Event <span className="text-primary">Hive</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={logout}
                className={`px-4 py-2 rounded-lg font-medium ${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"} transition-colors`}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className={`px-4 py-2 rounded-lg font-medium ${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"} transition-colors`}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className={`mb-6 p-4 rounded-lg ${darkMode ? "bg-green-800 text-green-100" : "bg-green-100 text-green-800"} text-center transition-all duration-300`}>
            <p className="font-medium">{successMessage}</p>
          </div>
        )}

        {/* Event Form */}
        <div className={`max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-2">Create New Event</h1>
            <p className={`text-center mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Fill in the details below to create your event</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Title */}
              <div>
                <label htmlFor="title" className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-primary focus:ring-primary" : "bg-white border-gray-300 focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1 transition`}
                  placeholder="Enter event title"
                  required
                />
              </div>

              {/* Event Venue */}
              <div>
                <label htmlFor="venue" className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Event Venue
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={eventData.venue}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-primary focus:ring-primary" : "bg-white border-gray-300 focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1 transition`}
                  placeholder="Enter event venue"
                  required
                />
              </div>

              {/* Date and Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div>
                  <label htmlFor="startDate" className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={eventData.startDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-primary focus:ring-primary" : "bg-white border-gray-300 focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1 transition`}
                    required
                  />
                </div>

                {/* End Date */}
                <div>
                  <label htmlFor="endDate" className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={eventData.endDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-primary focus:ring-primary" : "bg-white border-gray-300 focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1 transition`}
                    required
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label htmlFor="startTime" className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={eventData.startTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-primary focus:ring-primary" : "bg-white border-gray-300 focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1 transition`}
                    required
                  />
                </div>

                {/* End Time */}
                <div>
                  <label htmlFor="endTime" className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={eventData.endTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-primary focus:ring-primary" : "bg-white border-gray-300 focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1 transition`}
                    required
                  />
                </div>
              </div>

              {/* Event Description */}
              <div>
                <label htmlFor="description" className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Event Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-primary focus:ring-primary" : "bg-white border-gray-300 focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1 transition`}
                  placeholder="Describe your event..."
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="image" className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Event Image (Optional)
                </label>
                <div className={`flex items-center justify-center w-full rounded-lg border-2 border-dashed ${darkMode ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"} transition-colors cursor-pointer`}>
                  <label htmlFor="image" className="w-full p-6 text-center cursor-pointer">
                    <div className="space-y-2">
                      <svg className={`mx-auto h-12 w-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {imageFile ? imageFile.name : "Click to upload an image (optional)"}
                      </p>
                    </div>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Event...
                    </span>
                  ) : (
                    "Create Event"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateEvents;