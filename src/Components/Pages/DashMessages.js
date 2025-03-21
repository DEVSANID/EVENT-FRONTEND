import React from "react";
import { NavLink } from "react-router-dom";

const DashMessages = () => {
  return (
    <div className="w-[1440px] h-[1150px] flex bg-gray-100 p-0">
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

        
          </div>
        </div>
      
  );
};

export default DashMessages;