import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext"; // Import DarkModeContext

const Registration = () => {
  const { darkMode } = useContext(DarkModeContext); // Use DarkModeContext

  return (
    <div className={`font-sans px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <header className={`w-full max-w-[1200px] h-auto min-h-[49px] mx-auto flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 ${darkMode ? "bg-gray-800" : "bg-white"} mt-4 sm:mt-6`}>
        <Link to="/" className={`text-2xl sm:text-[40px] font-sans font-bold mb-3 sm:mb-0 ${darkMode ? "text-white" : "text-black"}`}>
          Event <span className="text-primary">Hive</span>
        </Link>

        <div>
          <button
            onClick={() => window.location.href = '/Login'}
            className={`mr-2 sm:text-[16px] sm:mr-4 font-sans px-4 sm:px-6 py-2 rounded-lg ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-black hover:bg-slate-200"}`}
          >
            Login
          </button>
          <button
            onClick={() => window.location.href = '/signup'}
            className="bg-primary sm:text-[16px] font-sans text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-600"
          >
            Signup
          </button>
        </div>
      </header>
      <div className={`flex flex-col items-center justify-start mt-10 flex-grow p-2 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className={`w-full max-w-[816px] ${darkMode ? "bg-gray-800" : "bg-white"} p-16 rounded-lg shadow-lg`}>
          <h2 className={`text-4xl font-bold text-center mb-10 ${darkMode ? "text-white" : "text-black"}`}>Registration</h2>
          <form className="space-y-8">
            <div>
              <label className={`block text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`mt-3 w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
              />
            </div>
            <div>
              <label className={`block text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`mt-3 w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;