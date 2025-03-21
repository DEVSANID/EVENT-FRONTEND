import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { DarkModeContext } from "../context/DarkModeContext"; // Import DarkModeContext

function College() {
  const { darkMode } = useContext(DarkModeContext); // Use DarkModeContext

  return (
    <div className={`font-sans ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Header Section */}
      <header className={`w-full max-w-[1200px] h-auto min-h-[49px] mx-auto flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 ${darkMode ? "bg-gray-800" : "bg-white"} mt-4 sm:mt-6`}>

        <Link to="/" className={`text-2xl sm:text-[40px] font-sans font-bold mb-3 sm:mb-0 ${darkMode ? "text-white" : "text-black"}`}>
          Event <span className="text-primary">Hive</span>
        </Link>

        <div>
          <button onClick={() => window.location.href = '/Login'} className={`mr-2 sm:text-[16px] sm:mr-4 font-sans ${darkMode ? "text-white" : "text-black"} px-4 sm:px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200`}>
            Login
          </button>
          <button onClick={() => window.location.href = '/signup'} className={`bg-primary sm:text-[16px] font-sans text-white px-4 sm:px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200`}>
            Signup
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mb-12">
        <div className="w-full max-w-7xl mx-auto bg-cover bg-center flex items-center justify-center text-white rounded-lg md:rounded-2xl mt-4 md:mt-6 h-[300px] md:h-[400px] lg:h-[596px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="IIT Roorkee Campus"
            className="w-full h-full object-cover rounded-lg md:rounded-2xl"
          />
        </div>
      </section>

      {/* Description */}
      <div className={`w-full max-w-[1200px] h-auto px-6 md:px-12 lg:px-10 mb-16 space-y-6 mx-auto ${darkMode ? "text-white" : "text-black"}`}>
        <h2 className="text-4xl font-bold">IIT Roorkee</h2>

        <p className="leading-relaxed">
          DesignHub organized a <strong>3D Modeling Workshop</strong> using Blender on <strong>February 16th at 5 PM</strong>. The workshop introduced participants to creating stunning 3D models and animations using Blender, catering to both beginners and experienced users. The event concluded with a thrilling Blender-render competition, adding to the excitement.
        </p>

        <p className="leading-relaxed">
          DesignHub organized a <strong>3D Modeling Workshop</strong> using Blender on <strong>February 16th at 5 PM</strong>. The workshop introduced participants to creating stunning 3D models and animations using Blender, catering to both beginners and experienced users. The event concluded with a thrilling Blender-render competition, adding to the excitement.
        </p>
      </div>

      {/* College Events Section */}
      <section className={`w-full max-w-[1200px] h-auto px-4 sm:px-6 md:px-12 lg:px-10 mb-16 space-y-6 mx-auto ${darkMode ? "text-white" : "text-black"}`}>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          College <span className="text-purple-600">Events</span>
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden p-5`}>
              {/* Image Container */}
              <div className="relative w-full flex justify-center">
                <img
                  src={
                    i % 2 === 0
                      ? "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      : "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Event"
                  className="w-full h-[240px] object-cover rounded-lg"
                />
                <span className={`absolute top-2 left-2 ${darkMode ? "bg-gray-700 text-primary" : "bg-white text-primary"} text-xs font-semibold px-2 py-1 rounded`}>
                  FREE
                </span>
              </div>

              {/* Event Content */}
              <div className="mt-4 text-left space-y-2">
                <h3 className={`text-md font-semibold leading-tight ${darkMode ? "text-white" : "text-black"}`}>
                  Bestseller Book Bootcamp - Write, Market & Publish Your Book
                </h3>
                <p className="text-xs font-medium text-primary leading-[2.5]">
                  Saturday, March 15, 5:30 PM
                </p>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  ONLINE EVENT - Attend anywhere
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default College;