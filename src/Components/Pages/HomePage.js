import React, { useState, useEffect, useContext } from "react";
import { FaSearch, FaEllipsisH, FaStar, FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  // Initialize user state from localStorage
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log("Logged-in user from localStorage:", loggedInUser); // Debugging
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data); // Initialize filteredEvents with all events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Dummy Blog Data
  useEffect(() => {
    setBlogs([
      {
        id: 1,
        title: "BestSeller Book Bootcamp - Write, Market & Publish Your Book - Lucknow",
        image: "/book.jpeg",
        date: "Saturday, March 18, 9:30PM",
        location: "ONLINE EVENT - Attend anywhere",
      },
      {
        id: 2,
        title: "BestSeller Book Bootcamp - Write, Market & Publish Your Book - Lucknow",
        image: "/book2.jpeg",
        date: "Saturday, March 18, 9:30PM",
        location: "ONLINE EVENT - Attend anywhere",
      },
      {
        id: 3,
        title: "BestSeller Book Bootcamp - Write, Market & Publish Your Book - Lucknow",
        image: "/book3.jpeg",
        date: "Saturday, March 18, 9:30PM",
        location: "ONLINE EVENT - Attend anywhere",
      },
    ]);
  }, []);

  const colleges = [
    {
      id: 1,
      name: "Harvard University",
      image: "/harvard.jpeg",
      location: "Cambridge, Massachusetts, UK",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Stanford University",
      image: "/stanford.jpeg",
      location: "Stanford, California",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Nanyang University",
      image: "/nanyang.jpeg",
      location: "Nanyang Ave, Singapura",
      rating: 4.8,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleSearch = () => {
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
    setVisibleEvents(6); // Reset visible events to initial value
  };

  return (
    <div className={`font-sans ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Header Section */}
      <header
        className={`w-full max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 rounded-lg shadow-md transition-all 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      >
        <Link to="/" className="text-3xl font-bold">
          Event <span className="text-primary">Hive</span>
        </Link>

        <div className="flex items-center gap-5">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
          </button>

          {user ? (
            <>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium border 
                ${darkMode ? "border-gray-500 bg-gray-800 text-gray-300" : "border-gray-300 bg-gray-100 text-gray-800"}`}
              >
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-md hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md hover:opacity-90 transition"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="w-full max-w-7xl mx-auto bg-cover bg-center flex items-center justify-center text-white rounded-lg md:rounded-2xl mt-4 md:mt-6 h-[300px] md:h-[400px] lg:h-[596px]"
        style={{ backgroundImage: "url('/Banner.png')" }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-[64px] font-sans font-bold text-white text-center leading-tight md:leading-[60px] px-4">
          MADE FOR THOSE <br /> WHO DO
        </h1>
      </section>

      {/* Event Search Bar */}
      <div className="w-full flex justify-center px-4">
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-navyBlue"
          } w-full max-w-[1200px] h-auto py-6 px-4 sm:px-6 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 rounded-2xl relative -top-8 sm:-top-12 md:-top-16 mx-auto shadow-lg text-white`}
        >
          {/* Event Type Dropdown */}
          <div className="flex flex-col w-full sm:w-[290px]">
            <label className="mb-2 text-sm font-medium">Looking for</label>
            <select
              className={`p-2 rounded-md ${
                darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"
              } w-full h-[40px]`}
            >
              <option value="">Choose event type</option>
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="College Events">College Events</option>
              <option value="Workshops">Workshops</option>
              <option value="Conferences">Conferences</option>
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="flex flex-col w-full sm:w-[290px]">
            <label className="mb-2 text-sm font-medium">Location</label>
            <select
              className={`p-2 rounded-md ${
                darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"
              } w-full h-[40px]`}
            >
              <option value="">Choose location</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Bihar">Bihar</option>
              <option value="Patna">Patna</option>
              <option value="Haryana">Haryana</option>
            </select>
          </div>

          {/* Date and Time Dropdown */}
          <div className="flex flex-col w-full sm:w-[290px]">
            <label className="mb-2 text-sm font-medium">When</label>
            <input
              type="datetime-local"
              className={`p-2 rounded-md ${
                darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"
              } w-full h-[40px]`}
            />
          </div>

          {/* Search Button */}
          <div className="w-full flex justify-center sm:w-auto">
            <button
              onClick={handleSearch}
              className="bg-primary p-4 rounded-lg text-white flex items-center justify-center w-[70px] h-[70px] mt-4 sm:mt-3 mx-6"
            >
              <FaSearch size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className={`w-full py-10 px-4 sm:px-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold"
          >
            Upcoming <span className="text-primary">Events</span>
          </motion.h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.slice(0, visibleEvents).map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg rounded-xl overflow-hidden p-5 cursor-pointer`}
              >
                <div className="relative w-full flex justify-center">
                  <img
                    src={event.imageUrl || "/default-event.jpg"}
                    alt={event.title}
                    className="w-full h-[240px] object-cover rounded-lg"
                  />
                </div>
                <div className="mt-4 text-left space-y-2">
                  <h3 className={`text-md font-semibold leading-tight ${darkMode ? "text-white" : "text-black"}`}>
                    {event.title}
                  </h3>
                  <p className="text-xs font-medium text-primary">
                    {event.startDate} - {event.endDate}
                  </p>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>📍 {event.venue}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">No events available</p>
          )}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleEvents((prev) => prev + 3)}
            className={`px-6 py-2 rounded-lg mt-9 ${
              visibleEvents >= filteredEvents.length
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-primary text-white hover:bg-slate-200 hover:text-slate-900"
            }`}
            disabled={visibleEvents >= filteredEvents.length}
          >
            {visibleEvents >= filteredEvents.length ? "No more events" : "Load more..."}
          </button>
        </div>
      </section>

      {/* Create Your Event Section */}
      <div
        className={`relative ${
          darkMode ? "bg-gray-800" : "bg-navyBlue"
        } text-white p-6 sm:p-7 rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between my-8 mx-4 sm:mx-auto max-w-6xl`}
      >
        <div className="w-full sm:w-1/2 flex justify-center sm:justify-start relative">
          <img
            src="/Logo.png"
            alt="Event Illustration"
            className="w-[180px] xs:w-[220px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-auto sm:absolute sm:-top-[130px] sm:left-10"
          />
        </div>
        <div className="w-full sm:w-1/2 text-center sm:text-left sm:pl-10 mt-4 sm:mt-0">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-sans font-bold -mx-[60px]">Make your own Event</h2>
          <p className="mt-2 text-sm xs:text-base sm:text-lg text-gray-300 -mx-[60px]">
            Create and manage your own events easily
          </p>
          <button
            onClick={() => {
              if (user) {
                navigate("/CreateEvents");
              } else {
                alert("Please log in to create an event.");
                navigate("/login");
              }
            }}
            className={`mt-4 bg-primary hover:bg-primary text-white font-semibold py-2 px-4 xs:px-5 sm:px-6 rounded-lg -mx-[60px] ${
              !user ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Create Events"
            disabled={!user}
          >
            Create Events
          </button>
        </div>
      </div>

      {/* Brand Logos Section */}
      <section className={`p-6 sm:p-12 text-center ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <h2 className="text-2xl sm:text-[36px] font-bold">
          Join these <span className="text-primary">brands</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 text-lg">
          <img src="/Google.png" alt="Google" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain" />
          <img src="/Spotify.png" alt="Spotify" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain" />
          <img src="/Microsoft.png" alt="Microsoft" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain" />
          <img src="/Uber.png" alt="Uber" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain" />
          <img src="/Zoom.png" alt="Zoom" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain" />
          <img src="/Stripe.png" alt="Stripe" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain" />
        </div>
      </section>

      {/* Trending Colleges Section */}
      <section className={`w-full py-8 sm:py-10 px-4 sm:px-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto mb-6">
          <h2 className="text-2xl sm:text-[36px] font-sans font-bold">
            Trending <span className="text-purple-500">colleges</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <div
              key={college.id}
              className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg overflow-hidden`}
            >
              <div className="relative">
                <img src={college.image} alt={college.name} className="w-full h-48 sm:h-56 object-cover rounded-xl" />
                <span className="absolute top-2 left-2 flex items-center bg-white text-black text-xs font-bold px-2 py-1 rounded-md">
                  <FaStar className="text-yellow-500 mr-1" /> {college.rating}
                </span>
                <span className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-md">
                  EXCLUSIVE
                </span>
              </div>
              <div className="p-4">
                <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>{college.name}</h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>{college.location}</p>
                <div className="mt-3 flex justify-end">
                  <FaEllipsisH className={`${darkMode ? "text-gray-400" : "text-gray-500"} cursor-pointer`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-8 flex justify-center">
          <button className="bg-purple-500 text-white px-6 py-2 rounded-md" aria-label="Load more">
            Load more...
          </button>
        </div>
      </section>

      {/* Blog Section */}
      <section className={`w-full py-8 sm:py-10 px-4 sm:px-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto mb-6">
          <h2 className="text-2xl sm:text-[36px] font-sans font-bold">
            Our <span className="text-primary">Blogs</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden p-5`}
            >
              <div className="relative w-full flex justify-center">
                <img src={blog.image} alt={blog.title} className="w-full h-[240px] object-cover rounded-lg" />
                <span className="absolute top-2 left-2 bg-white text-primary text-xs font-semibold px-2 py-1 rounded">
                  FREE
                </span>
              </div>
              <div className="mt-4 text-left space-y-2">
                <h3 className={`text-md font-semibold leading-tight ${darkMode ? "text-white" : "text-black"}`}>
                  {blog.title}
                </h3>
                <p className="text-xs font-medium text-primary leading-[2.5]">{blog.date}</p>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{blog.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default HomePage;