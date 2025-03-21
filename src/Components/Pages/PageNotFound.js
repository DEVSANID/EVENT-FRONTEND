import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Footer from "../Footer";
import { DarkModeContext } from "../context/DarkModeContext"; // Import DarkModeContext

const PageNotFound = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext); // Use DarkModeContext

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"} flex flex-col items-center`}>
      {/* Header */}
      <header className={`w-full max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 ${darkMode ? "bg-gray-800" : "bg-white"} mt-4 sm:mt-6`}>
        <Link to="/" className={`text-2xl sm:text-[40px] font-sans font-bold mb-3 sm:mb-0 ${darkMode ? "text-white" : "text-black"}`}>
          Event <span className="text-primary">Hive</span>
        </Link>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <button
            onClick={() => navigate('/Login')}
            className={`mr-2 sm:mr-4 sm:text-[16px] font-sans px-4 sm:px-6 py-2 rounded-lg ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-black hover:bg-slate-200"}`}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-primary sm:text-[16px] font-sans text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-600"
          >
            Signup
          </button>
        </div>
      </header>

      {/* 404 Section */}
      <div className={`flex flex-col items-center text-center mt-8 px-4 ${darkMode ? "text-white" : "text-black"}`}>
        <img
          src="/pagenotfound.png"
          alt="404 Illustration"
          style={{ 
            width: "100%", 
            maxWidth: "722px", 
            height: "auto", 
            maxHeight: "392px" 
          }}
          className="mb-6 w-full sm:w-[722px] h-auto sm:h-[392px]"
        />
        <h2 className="text-2xl font-bold">Oops!</h2>
        <p className={`mt-2 text-sm sm:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          We can’t seem to find the page you are looking for
        </p>

        {/* Back to Homepage Button */}
        <Link to="/">
          <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 text-sm sm:text-base">
            Back to Homepage
          </button>
        </Link>

        {/* Follow Us Section */}
        <div className="mt-10 text-center mb-8">
          <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>Follow us on</h3>
          <div className="flex justify-center space-x-2 sm:space-x-4 mt-4 flex-wrap gap-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 bg-purple-100 p-1.5 sm:p-2 rounded-lg hover:bg-purple-200" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 bg-purple-100 p-1.5 sm:p-2 rounded-lg hover:bg-purple-200" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 bg-purple-100 p-1.5 sm:p-2 rounded-lg hover:bg-purple-200" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 bg-purple-100 p-1.5 sm:p-2 rounded-lg hover:bg-purple-200" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 bg-purple-100 p-1.5 sm:p-2 rounded-lg hover:bg-purple-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full">
        <Footer darkMode={darkMode} /> {/* Pass darkMode prop to Footer */}
      </footer>
    </div>
  );
};

export default PageNotFound;