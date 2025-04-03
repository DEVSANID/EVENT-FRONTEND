import React, { useState, useEffect, useContext, useRef } from "react";
import { FaSearch, FaEllipsisH, FaStar, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";
import Chatbot from "./ChatBot";
import BlogForm from "./BlogForm"; // Import the BlogForm component
import axios from "axios";


// Reusable Event Card Component
const EventCard = ({ event, darkMode }) => (
  <Link to={`/event/${event._id}`} key={event._id}>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className={`${darkMode ? "bg-gray-800" : "bg-white"
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
  </Link>
);

// Reusable College Card Component
const CollegeCard = ({ college, darkMode }) => (
  <div
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
);

// Reusable Blog Card Component
const BlogCard = ({ blog, darkMode }) => (
  <div
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


  // Initialize user state from localStorage
  const fetchBookings = async (email) => {
    if (!email) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/${email}`);
      console.log("Fetched Bookings:", response.data);
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
      fetchBookings(loggedInUser.email); // Pass email directly
    }
  }, []);

  const handleShowBookings = () => {
    setShowBookings(!showBookings); // ✅ Toggle bookings visibility
    if (!showBookings) {
      fetchBookings();
    }
  };
  useEffect(() => {
    const trackVisitor = async () => {
      let visitorEmail = localStorage.getItem("visitorEmail"); // Retrieve existing email
      if (!visitorEmail) {
        visitorEmail = `visitor_${Date.now()}@example.com`; // Create a new visitor email if none exists
        localStorage.setItem("visitorEmail", visitorEmail); // Store it in localStorage
      }
  
      const sessionId = localStorage.getItem("sessionId") || Date.now().toString();
      localStorage.setItem("sessionId", sessionId); // Store session ID
  
      try {
        await axios.post("http://localhost:5000/api/visitors", {
          name: "Anonymous Visitor",
          email: visitorEmail, // ✅ Use stored email instead of generating a new one
        }, {
          headers: {
            "visitor-session": sessionId, // ✅ Send session ID to backend
          },
        });
      } catch (error) {
        console.error("Error tracking visitor:", error);
      }
    };
  
    trackVisitor();
  }, []); // ✅ Runs only once per session
  
   

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);
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
        const response = await fetch("http://localhost:5000/api/blogs");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
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
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage
    if (user) {
      axios.post("http://localhost:5000/api/visitors", {
        name: user.name,
        email: user.email,
        isSubscribed: user.isSubscribed || false
      }).catch((error) => console.error("Error tracking visitor:", error));
    }
  }, []);


  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/colleges/trending");
        if (response.ok) {
          const data = await response.json();
          setColleges(data);
        } else {
          console.error("Failed to fetch trending colleges:", response.status);
        }
      } catch (error) {
        console.error("Error fetching trending colleges:", error);
      }
    };
  
    fetchColleges();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");  // Ensure token is removed too
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
    setBlogs([newBlog, ...blogs]);
    setShowBlogForm(false);
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
                            <Link
                              key={booking._id}
                              to={`/event/${booking.eventId}`}
                              className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              {booking.name} ({booking.tickets} tickets)
                            </Link>
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
          className={`${darkMode ? "bg-gray-800" : "bg-navyBlue"
            } w-full max-w-[1200px] h-auto py-6 px-4 sm:px-6 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 rounded-2xl relative -top-8 sm:-top-12 md:-top-16 mx-auto shadow-lg text-white`}
        >
          {/* Search Input */}
          <div className="flex flex-col w-full sm:w-[290px]">
            <label className="mb-2 text-sm font-medium">Search by name</label>
            <input
              type="text"
              placeholder="Event name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`p-2 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"
                } w-full h-[40px]`}
            />
          </div>

          {/* Event Date Picker */}
          <div className="flex flex-col w-full sm:w-[290px]">
            <label className="mb-2 text-sm font-medium">Select Date</label>
            <input
              type="date"
              className={`p-2 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"
                } w-full h-[40px]`}
            />
          </div>


          {/* Location Dropdown */}
          <div className="flex flex-col w-full sm:w-[290px]">
            <label className="mb-2 text-sm font-medium">Location</label>
            <select
              className={`p-2 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-backgroundGrey text-black"
                } w-full h-[40px]`}
            >
              <option value="">Choose location</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Haryana">Haryana</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="w-full flex justify-center sm:w-auto">
            <button
              className="bg-primary p-4 rounded-lg text-white flex items-center justify-center w-[70px] h-[70px] mt-4 sm:mt-3 mx-6"
            >
              <FaSearch size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className={`w-full  px-4 sm:px-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
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
          <p className="text-center text-gray-500">Loading events...</p>
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
        className={`relative ${darkMode ? "bg-gray-800" : "bg-navyBlue"
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
    <img src="/Google.png" alt="Google" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain" />
    <img src="/Spotify.png" alt="Spotify" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain" />
    <img src="/Microsoft.png" alt="Microsoft" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain" />
    <img src="/Uber.png" alt="Uber" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain dark:invert" />
    <img src="/Zoom.png" alt="Zoom" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain" />
    <img src="/Stripe.png" alt="Stripe" className="h-8 sm:h-12 max-w-[80px] sm:max-w-[100px] object-contain dark:invert" />
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
      <CollegeCard key={college._id || college.id} college={college} darkMode={darkMode} />
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
        <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
          <h2 className="text-2xl sm:text-[36px] font-sans font-bold">
            Our <span className="text-primary">Blogs</span>
          </h2>
          {user && (
            <button
              onClick={() => setShowBlogForm(!showBlogForm)}
              className="bg-primary text-white px-4 py-2 rounded-md"
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
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} darkMode={darkMode} />
          ))}
        </div>
      </section>

      <Chatbot darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default HomePage;