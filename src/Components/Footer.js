import React, { useState, useEffect } from "react";
import { FaLinkedin, FaInstagram, FaRegCircle } from "react-icons/fa";
import axios from "axios";

const Footer = ({ darkMode }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in by verifying token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    setIsLoggedIn(!!token);
  }, []);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async () => {
    if (!isLoggedIn) {
      setMessage("You must be logged in to subscribe.");
      return;
    }

    if (!email) {
      setMessage("Please enter an email.");
      return;
    }
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/visitors/subscribe",
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setMessage("Subscription failed. Try again.");
      console.error("Error subscribing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={`${darkMode ? "bg-gray-900 text-gray-300" : "bg-blue-900 text-white"} py-4 px-4 md:px-16`}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-[40px] font-sans font-bold mb-4">
          Event <span className="text-purple-400">Hive</span>
        </h2>
        <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
          <div className="flex w-full sm:w-auto max-w-xs md:max-w-none">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 text-white" : "text-black"} w-full sm:w-64 md:w-80 max-w-xs sm:max-w-none border ${
                email && !isValidEmail(email) ? "border-red-500" : "border-gray-300"
              }`}
              disabled={!isLoggedIn}
            />
            <button
              className={`px-6 py-2 rounded-md text-white font-semibold w-auto md:ml-2 ml-2 ${
                isLoggedIn ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-500 cursor-not-allowed"
              }`}
              onClick={handleSubscribe}
              disabled={loading || !isLoggedIn}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </div>
        {message && <p className="text-sm mt-2 text-red-400">{message}</p>}
        <nav className="mt-6">
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm">
            <li className="cursor-pointer hover:text-purple-300">Home</li>
            <li className="cursor-pointer hover:text-purple-300">About</li>
            <li className="cursor-pointer hover:text-purple-300">Services</li>
            <li className="cursor-pointer hover:text-purple-300">Get in touch</li>
            <li className="cursor-pointer hover:text-purple-300">FAQs</li>
          </ul>
        </nav>
        <hr className={`${darkMode ? "border-gray-700" : "border-white"} my-3`} />
        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="flex gap-4 mt-4 md:mt-0">
            <FaLinkedin className="text-xl cursor-pointer hover:text-purple-300" />
            <FaInstagram className="text-xl cursor-pointer hover:text-purple-300" />
            <FaRegCircle className="text-xl cursor-pointer hover:text-purple-300" />
          </div>
          <p className="mt-4 md:mt-0 text-xs">Non Copyrighted © 2023 Upload by EventHive</p>
        </div>
      </div>
      <div className="flex gap-2 md:gap-4 justify-center mt-4">
        <button className="bg-purple-500 px-3 py-1 rounded-md text-white text-xs hover:bg-purple-600">
          English
        </button>
        <span className="cursor-pointer hover:text-purple-300">French</span>
        <span className="cursor-pointer hover:text-purple-300">Hindi</span>
      </div>
    </footer>
  );
};

export default Footer;
