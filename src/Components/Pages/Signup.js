import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message);
      navigate("/Login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={`relative flex justify-center items-center min-h-screen p-4 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className={`relative w-full max-w-[1440px] min-h-[900px] flex flex-col lg:grid lg:grid-cols-3 ${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg rounded-lg shadow-lg overflow-hidden`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side - Form */}
        <div className={`w-full lg:col-span-2 flex justify-center items-center ${darkMode ? "bg-gray-700/80" : "bg-white/80"} order-2 lg:order-1 p-6 rounded-l-lg shadow-xl`}>
          <div className="w-[90%] max-w-[578px] flex flex-col justify-center text-center">
            <h2 className={`text-4xl font-extrabold mb-6 ${darkMode ? "text-white" : "text-black"}`}>
              Join <span className="text-primary">Event Hive</span>
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className={`w-full h-[46px] p-3 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none transition ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`w-full h-[46px] p-3 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none transition ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className={`w-full h-[46px] p-3 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none transition ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className={`w-full h-[46px] p-3 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none transition ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white p-3 rounded-lg hover:bg-purple-600 transition"
              >
                Sign Up
              </button>
            </form>
            <div className="flex items-center justify-center mt-4">
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Or continue with</span>
            </div>
            <div className="flex justify-center mt-3">
              <button
                className={`w-full flex justify-center items-center gap-2 border p-3 rounded-lg ${
                  darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-black hover:bg-gray-100"
                } transition`}
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>
            </div>
            <div className={`text-center mt-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <span>Already have an account? </span>
              <Link to="/Login" className="text-purple-600 font-semibold">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div
          className="w-full lg:col-span-1 flex items-center justify-center bg-cover bg-center relative min-h-[500px] lg:min-h-[900px] order-1 lg:order-2 rounded-r-lg shadow-xl"
          style={{ backgroundImage: "url('/signupp.png')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-r-lg"></div>
          <div className="relative text-center text-white px-6">
            <h2 className="text-3xl font-bold mb-2">Welcome to Event Hive</h2>
            <p className="text-sm mt-4 mb-4">Join us today and explore amazing events.</p>
            <Link to="/Login">
              <button className="mt-4 bg-white text-black px-4 py-2 rounded border hover:bg-gray-200 transition">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;