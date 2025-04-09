import React, { useState, useEffect, useContext, useRef } from "react";
import { FaSearch, FaEllipsisH, FaStar, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";
import Chatbot from "./ChatBot";
import BlogForm from "./BlogForm";
import axios from "axios";

// Reusable Event Card Component
const EventCard = ({ event, darkMode }) => (
  <Link to={`/event/${event._id}`} key={event._id}>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden p-5 cursor-pointer`}
    >
      <div className="relative w-full flex justify-center">
        <img
          src={event.imageUrl || "/default-event.jpg"}
          alt={event.title}
          className="w-full h-[240px] object-cover rounded-lg"
          onError={(e) => {
            e.target.src = "/default-event.jpg";
          }}
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
  </Link>
);

// Updated CollegeCard component with animation
const CollegeCard = ({ college, darkMode, onClick }) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg overflow-hidden cursor-pointer`}
  >
    <div className="relative">
      <img
        src={college.image}
        alt={college.name}
        className="w-full h-48 sm:h-56 object-cover rounded-xl"
        onError={(e) => {
          e.target.src = "/default-college.jpg";
        }}
      />
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
  </motion.div>
);

// Updated BlogCard component with animation
const BlogCard = ({ blog, darkMode, onClick }) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden p-5 cursor-pointer`}
  >
    <div className="relative w-full flex justify-center">
      <img
        src={blog.imageUrl || blog.image || "/default-blog.jpg"}
        alt={blog.title}
        className="w-full h-[240px] object-cover rounded-lg"
        onError={(e) => {
          e.target.src = "/default-blog.jpg";
        }}
      />
      <span className="absolute top-2 left-2 bg-white text-primary text-xs font-semibold px-2 py-1 rounded">
        FREE
      </span>
    </div>
    <div className="mt-4 text-left space-y-2">
      <h3 className={`text-md font-semibold leading-tight ${darkMode ? "text-white" : "text-black"}`}>
        {blog.title}
      </h3>
      {/* Add author name here */}
      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        By {blog.author || "Unknown Author"}
      </p>
      <p className="text-xs font-medium text-primary leading-[2.5]">{blog.date}</p>
      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        📍 {blog.location}
      </p>
    </div>
  </motion.div>
);


const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [colleges, setColleges] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const backendBaseURL = "http://localhost:5000";



  // Add this function to handle college selection
  const handleCollegeClick = (college) => {
    setSelectedCollege(college);
    setIsModalOpen(true);
  };


  // Initialize user state from localStorage
  const fetchBookings = async (email) => {
    if (!email) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/get-bookings/${email}`);

      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
      fetchBookings(loggedInUser.email);
    }
  }, []);

  const handleShowBookings = () => {
    setShowBookings(!showBookings);
    if (!showBookings && user) {
      fetchBookings(user.email);
    }
  };

  useEffect(() => {
    const trackVisitor = async () => {
      let visitorEmail = localStorage.getItem("visitorEmail");
      if (!visitorEmail) {
        visitorEmail = `visitor_${Date.now()}@example.com`;
        localStorage.setItem("visitorEmail", visitorEmail);
      }

      const sessionId = localStorage.getItem("sessionId") || Date.now().toString();
      localStorage.setItem("sessionId", sessionId);

      try {
        await axios.post("http://localhost:5000/api/visitors", {
          name: "Anonymous Visitor",
          email: visitorEmail,
        }, {
          headers: {
            "visitor-session": sessionId,
          },
        });
      } catch (error) {
        console.error("Error tracking visitor:", error);
      }
    };

    trackVisitor();
  }, []);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Fallback to dummy data if API fails
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
      }
    };

    fetchBlogs();
  }, []);

  // Filter events based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
    setVisibleEvents(6);
  }, [searchTerm, events]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/colleges/trending");
        setColleges(response.data);
      } catch (error) {
        console.error("Error fetching trending colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNewBlog = (newBlog) => {
    setBlogs(prevBlogs => [{
      ...newBlog,
      image: newBlog.imageUrl, // Map imageUrl to image for backward compatibility
      id: newBlog.id || Date.now() // Ensure we have an ID
    }, ...prevBlogs]);
    setShowBlogForm(false);
  };

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (searchTerm) queryParams.append("name", searchTerm);
      if (selectedDate) queryParams.append("date", selectedDate);
      if (selectedLocation) queryParams.append("location", selectedLocation);

      const response = await fetch(
        `http://localhost:5000/api/events/search?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Search result:", data);
      setFilteredEvents(data); // Display results in UI
    } catch (error) {
      console.error("Search error:", error);
    }
  };


  return (
    <div className={`font-sans ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Sticky & Transparent Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/30 dark:bg-gray-900/30 shadow-md">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-black dark:text-white">
            Event <span className="text-primary">Hive</span>
          </Link>

          {/* Right Section: Dark Mode + User Profile */}
          <div className="flex items-center gap-5">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <FaSun size={22} className="text-yellow-500" /> : <FaMoon size={22} />}
            </button>

            {user ? (
              <div className="relative" ref={profileRef}>
                {/* Profile Button */}
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                  <FaUserCircle size={28} className="text-black dark:text-white" />
                  <span className="text-sm font-medium text-black dark:text-white">{user.name}</span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2">
                    <p className="px-4 py-2 text-sm font-medium text-black dark:text-white">
                      {user.name}
                    </p>
                    <p className="px-4 py-2 text-xs text-gray-500 dark:text-gray-300">
                      {user.email}
                    </p>
                    <hr className="border-gray-200 dark:border-gray-700" />

                    {/* My Orders */}
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      My Orders 📦
                    </Link>

                    {/* Event Shop */}
                    <Link
                      to="/shop"
                      className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Event Shop 🛒
                    </Link>

                    {/* My Bookings Toggle Button */}
                    <button
                      onClick={handleShowBookings}
                      className="block w-full text-left px-4 py-2 text-sm font-semibold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      My Bookings 🎟️
                    </button>

                    {/* Bookings List */}
                    {showBookings && (
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg max-h-40 overflow-auto">
                        {bookings.length > 0 ? (
                          bookings.map((booking) => (
                            <div key={booking._id} className="px-4 py-2">
                              <p className="text-sm text-black dark:text-white font-medium">
                                {booking.name} ({booking.tickets} tickets)
                              </p>

                              <div className="flex gap-2 mt-1">
                                {/* View Event */}
                                <Link
                                  to={`/event/${booking.eventId}`}
                                  className="text-blue-600 dark:text-blue-400 text-xs hover:underline"
                                >
                                  View Event
                                </Link>

                                {/* Open PDF in New Tab */}
                                {booking.ticketPath ? (
                                  <a
                                    href={`${backendBaseURL}${booking.ticketPath}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 dark:text-green-400 text-xs hover:underline"
                                  >
                                    View Ticket 🎟️
                                  </a>
                                ) : (
                                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                                    Ticket not available
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="px-4 py-2 text-xs text-gray-500 dark:text-gray-300">
                            {bookings.length === 0 ? "No bookings found" : "Loading..."}
                          </p>
                        )}
                      </div>
                    )}


                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 text-sm font-semibold text-black dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
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
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="w-full max-w-7xl mx-auto bg-cover bg-center flex items-center justify-center text-white rounded-lg md:rounded-2xl mt-4 md:mt-6 h-[300px] md:h-[400px] lg:h-[470px]"
        style={{ backgroundImage: "url('/Banner.png')" }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-[64px] font-sans font-bold text-white text-center leading-tight md:leading-[60px] px-4">
          MADE FOR THOSE <br /> WHO DO
        </h1>
      </section>

      {/* Event Search Bar */}
      <div className="w-full flex justify-center px-4">
        <div
          className={`${darkMode ? "bg-gray-800" : "bg-navyBlue"} w-full max-w-[1200px] h-auto py-6 px-4 sm:px-6 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 rounded-2xl relative -top-8 sm:-top-12 md:-top-16 mx-auto shadow-lg text-white`}
        >
          {/* Search Input */}
          <div className="flex flex-col w-full sm:w-[290px]">
            <label htmlFor="search-input" className="mb-2 text-sm font-medium">Search by name</label>
            <input
              id="search-input"
              type="text"
              placeholder="Event name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`p-2 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"} w-full h-[40px]`}
            />
          </div>

          {/* Event Date Picker */}
          <div className="flex flex-col w-full sm:w-[290px]">
            <label htmlFor="event-date" className="mb-2 text-sm font-medium">Select Date</label>
            <input
              id="event-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`p-2 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"} w-full h-[40px]`}
            />
          </div>


          {/* Location Input */}
          <div className="flex flex-col w-full sm:w-[290px]">
            <label htmlFor="location-input" className="mb-2 text-sm font-medium">Location</label>
            <input
              id="location-input"
              type="text"
              placeholder="City or venue..."
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`p-2 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"} w-full h-[40px]`}
            />
          </div>

          {/* Search Button */}
          <div className="w-full flex justify-center sm:w-auto">
            <button
              className="bg-primary p-4 rounded-lg text-white flex items-center justify-center w-[70px] h-[70px] mt-4 sm:mt-3 mx-6"
              aria-label="Search events"
              onClick={handleSearch}
            >
              <FaSearch size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className={`w-full px-4 sm:px-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
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

        {isLoading ? (
          <div className="max-w-6xl mx-auto flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.slice(0, visibleEvents).map((event) => (
                <EventCard key={event._id} event={event} darkMode={darkMode} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">No events found matching your search</p>
            )}
          </div>
        )}

        {/* Load More Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleEvents((prev) => prev + 3)}
            className={`px-6 py-2 rounded-lg mt-9 ${visibleEvents >= filteredEvents.length
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
        className={`relative ${darkMode ? "bg-gray-800" : "bg-navyBlue"} text-white p-6 sm:p-7 rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between my-8 mx-4 sm:mx-auto max-w-6xl`}
      >
        <div className="w-full sm:w-1/2 flex justify-center sm:justify-start relative">
          <img
            src="/Logo.png"
            alt="Event Illustration"
            className="w-[180px] xs:w-[220px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-auto sm:absolute sm:-top-[130px] sm:left-10"
            onError={(e) => {
              e.target.src = "/default-image.jpg";
            }}
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
            className={`mt-4 bg-primary hover:bg-primary text-white font-semibold py-2 px-4 xs:px-5 sm:px-6 rounded-lg -mx-[60px] ${!user ? "opacity-50 cursor-not-allowed" : ""
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
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 text-lg bg-transparent">
          {["Google", "Spotify", "Microsoft", "Uber", "Zoom", "Stripe"].map((brand) => (
            <img
              key={brand}
              src={`/${brand}.png`}
              alt={brand}
              className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain"
              onError={(e) => {
                e.target.src = "/default-brand.png";
              }}
            />
          ))}
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
          {colleges.map((college, index) => (
            <motion.div
              key={college._id || college.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              className="shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl"
            >
              <CollegeCard
                college={college}
                darkMode={darkMode}
                onClick={() => handleCollegeClick(college)}
              />
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-8 flex justify-center">
          <button
            className="bg-purple-500 text-white px-6 py-2 rounded-md"
            aria-label="Load more colleges"
          >
            Load more...
          </button>
        </div>
      </section>

      {/* Blog Section */}
      <section className={`w-full py-8 sm:py-10 px-4 sm:px-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
          <h2 className="text-2xl sm:text-[36px] font-sans font-bold">
            Our <span className="text-primary">Blogs</span>
          </h2>
          {user && (
            <button
              onClick={() => setShowBlogForm(!showBlogForm)}
              className="bg-primary text-white px-4 py-2 rounded-md"
              aria-label={showBlogForm ? 'Hide blog form' : 'Add new blog'}
            >
              {showBlogForm ? 'Hide Form' : 'Add Blog'}
            </button>
          )}
        </div>

        {/* Blog Form - Only shown when user is logged in and showBlogForm is true */}
        {user && showBlogForm && (
          <div className="max-w-6xl mx-auto mb-8">
            <BlogForm
              darkMode={darkMode}
              onNewBlog={handleNewBlog}
            />
          </div>
        )}

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              className="shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl"
            >
              <BlogCard
                blog={blog}
                darkMode={darkMode}
                onClick={() => {
                  setSelectedBlog(blog);
                  setIsBlogModalOpen(true);
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>


      {isBlogModalOpen && selectedBlog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => setIsBlogModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className={`relative max-w-2xl w-full rounded-2xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsBlogModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="relative h-64 w-full">
              <img
                src={selectedBlog.imageUrl || "/default-blog.jpg"}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">{selectedBlog.title}</h2>
                <div className="flex items-center mt-1">
                  <span>{selectedBlog.date}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedBlog.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Blog Content</h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>
                {selectedBlog.content || "No content available for this blog post."}
              </p>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Author</h4>
                <div className="flex items-center">
                  <FaUserCircle className="text-gray-500 mr-2" size={24} />
                  <span>{selectedBlog.author || "Unknown Author"}</span>
                </div>
              </div>

              <button
                className={`mt-6 w-full py-3 rounded-lg font-medium ${darkMode ? "bg-primary hover:bg-primary-dark" : "bg-navyBlue hover:bg-blue-700"} text-white transition`}
              >
                Read Full Article
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}



      {isModalOpen && selectedCollege && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className={`relative max-w-2xl w-full rounded-2xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="relative h-64 w-full">
              <img
                src={selectedCollege.image || "/default-college.jpg"}
                alt={selectedCollege.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">{selectedCollege.name}</h2>
                <div className="flex items-center mt-1">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{selectedCollege.rating}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedCollege.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">About the College</h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {selectedCollege.description || "No description available for this college."}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Courses Offered</h4>
                  <ul className="space-y-1">
                    {(selectedCollege.courses || ["Computer Science", "Engineering"]).map((course, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Facilities</h4>
                  <ul className="space-y-1">
                    {(selectedCollege.facilities || ["Library", "Sports Complex", "Hostel"]).map((facility, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                className={`mt-6 w-full py-3 rounded-lg font-medium ${darkMode ? "bg-primary hover:bg-primary-dark" : "bg-navyBlue hover:bg-blue-700"} text-white transition`}
              >
                Visit College Website
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Chatbot darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default HomePage;