import React from "react";
import { NavLink } from "react-router-dom";


const events = [
  {
    title: "Abstract Colors",
    author: "Esthera Jackson",
    image: "https://via.placeholder.com/300",
  },
  {
    title: "Abstract Colors",
    author: "Esthera Jackson",
    image: "https://via.placeholder.com/300",
  },
  {
    title: "Abstract Colors",
    author: "Esthera Jackson",
    image: "https://via.placeholder.com/300",
  },
];

const DashEvents = () => {
  return (
    <div className="w-[1440px] h-[1150px] flex bg-backgroundGrey p-0">
      {/* Sidebar */}
    <div className="w-[250px] h-[1150px] bg-white flex flex-col items-center px-0 py-0 shadow-lg">
        <h1 className="text-primary text-center text-[27px] font-bold mt-4 px-6 py-4">Event Hive</h1>
        <nav className="w-full px-6 mt-8">
        <NavLink
            to="/dashboard"
            className={({ isActive }) =>
            `block px-6 py-4 font-semibold rounded-lg ${
                isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"
            }`
            }
        >
            Dashboard
        </NavLink>
        <NavLink
            to="/dash-events"
            className={({ isActive }) =>
            `block px-6 py-4 font-semibold rounded-lg ${
                isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"
            }`
            }
        >
            Events
        </NavLink>
        <NavLink
            to="/dash-messages"
            className={({ isActive }) =>
            `block px-6 py-4 font-semibold rounded-lg ${
                isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"
            }`
            }
        >
            Messages
        </NavLink>
        <NavLink
            to="/dash-profile"
            className={({ isActive }) =>
            `block px-6 py-4 font-semibold rounded-lg ${
                isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"
            }`
            }
        >
            Profile
        </NavLink>
        </nav>
    </div>

      {/* Main Content */}
      <div className="w-[1190px] flex flex-col px-0 py-0">
        {/* Top Blank Card */}
        <div className="w-[1190px] h-[100px] bg-white"></div>
        <div className="bg-white min-h-screen p-6 w-[1130px] h-[1328px] mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-10 rounded-lg text-center relative overflow-hidden w-[1130px] h-[370px] mx-auto">
        <div className="absolute left-[64px] top-[57.5px] w-[377px] h-[156px] text-left">
          <h1 className="text-4xl font-bold">Discover and experience <br /> extraordinary Events</h1>
          <p className="mt-2 text-lg">Enter in the world of events. Discover now the latest Events or start creating your own!</p>
          <div className="mt-4 flex justify-start gap-4">
            <NavLink to="/discover" className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold">Discover now</NavLink>
            <NavLink to="/watch-video" className="border border-white px-6 py-2 rounded-lg font-semibold">Watch video</NavLink>
          </div>
        </div>
        <div className="absolute top-0 right-10 w-32 h-32">
          <img src="/path-to-graduation-hat.png" alt="Graduation Hat" />
        </div>
      </div>

      {/* Events Participated Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-blue-600">Events Participated</h2>
        <div className="flex justify-center gap-6 mt-4">
          {events.map((event, index) => (
            <NavLink key={index} to={`/event/${index}`} className="bg-white p-4 rounded-lg shadow-lg relative w-[350px] h-[370px]">
              <img src={event.image} alt={event.title} className="rounded-lg w-full h-56 object-cover" />
              <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
              <p className="text-gray-500">By {event.author}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-blue-600">Current Data</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Register</button>
              </div>
              <button className="absolute top-3 right-3 text-white">❤️</button>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Trending Events Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Trending Events</h2>
        <div className="flex justify-center mt-4">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-[1130px] h-[370px] flex gap-6">
            {events.map((event, index) => (
              <NavLink key={index} to={`/event/${index}`} className="bg-white p-4 rounded-lg shadow-lg relative w-[350px] h-[370px]">
                <img src={event.image} alt={event.title} className="rounded-lg w-full h-56 object-cover" />
                <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
                <p className="text-gray-500">By {event.author}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-blue-600">Current Data</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Register</button>
                </div>
                <button className="absolute top-3 right-3 text-white">❤️</button>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
    </div>

        
          </div>
        </div>
      
  );
};

export default DashEvents;