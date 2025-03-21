import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import { DarkModeContext } from "../context/DarkModeContext"; // Import DarkModeContext

const CollegeEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { darkMode } = useContext(DarkModeContext); // Use DarkModeContext

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <div className={`font-sans px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        {/* Header Section */}
        <header className={`w-full max-w-[1200px] h-auto min-h-[49px] mx-auto flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 ${darkMode ? "bg-gray-800" : "bg-white"} mt-4 sm:mt-6`}>
          <Link to="/" className={`text-2xl sm:text-[40px] font-sans font-bold mb-3 sm:mb-0 ${darkMode ? "text-white" : "text-black"}`}>
            Event <span className="text-primary">Hive</span>
          </Link>
          <div>
            <button onClick={() => (window.location.href = "/Login")} className={`mr-2 sm:text-[16px] sm:mr-4 font-sans ${darkMode ? "text-white" : "text-black"} px-4 sm:px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200`}>
              Login
            </button>
            <button onClick={() => (window.location.href = "/signup")} className={`bg-primary sm:text-[16px] font-sans text-white px-4 sm:px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200`}>
              Signup
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mt-6">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>
            Checkout your <span className="text-primary">college events</span> now!!
          </h1>
          <div className="relative flex justify-center items-center overflow-hidden max-w-full">
            <img src="left.png" alt="college" className="rounded-lg w-[568px] h-[207px] object-cover absolute left-[-20%] sm:static" />
            <img src="Centre.png" alt="university" className="rounded-lg w-[568px] h-[299px] object-cover z-10" />
            <img src="right.png" alt="campus" className="rounded-lg w-[568px] h-[207px] object-cover absolute right-[-20%] sm:static" />
          </div>
        </div>

        {/* Upcoming Events Section */}
        <section className={`w-full ${darkMode ? "bg-gray-900" : "bg-white"} py-10 px-4 sm:px-6`}>
          <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className={`text-2xl sm:text-3xl font-inter font-bold ${darkMode ? "text-white" : "text-black"}`}>
              Upcoming <span className="text-primary">Events</span>
            </h2>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <select className={`px-3 sm:px-4 py-2 ${darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"} rounded-md text-sm`}>
                <option>Weekdays</option>
              </select>
              <select className={`px-3 sm:px-4 py-2 ${darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"} rounded-md text-sm`}>
                <option>Event type</option>
              </select>
              <select className={`px-3 sm:px-4 py-2 ${darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"} rounded-md text-sm`}>
                <option>Any category</option>
              </select>
            </div>
          </div>
        </section>

        {/* Event Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {loading ? (
            <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Loading events...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : events.length === 0 ? (
            <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>No events available.</p>
          ) : (
            events.map((event) => (
              <div key={event._id} className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden p-5`}>
                {/* Image Container */}
                <div className="relative w-full flex justify-center">
                  <img src={event.image} alt={event.title} className="w-full h-[240px] object-cover rounded-lg" />
                  <span className={`absolute top-2 left-2 ${darkMode ? "bg-gray-700 text-primary" : "bg-white text-primary"} text-xs font-semibold px-2 py-1 rounded`}>
                    {event.tag}
                  </span>
                </div>

                {/* Event Content */}
                <div className="mt-4 text-left space-y-2">
                  <h3 className={`text-md font-semibold leading-tight ${darkMode ? "text-white" : "text-black"}`}>{event.title}</h3>
                  <p className="text-xs font-medium text-primary leading-[2.5]">{event.date}</p>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{event.location}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default CollegeEvents;