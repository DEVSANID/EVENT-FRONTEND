import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
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

        {/* Content Section */}
        <div className="flex flex-col items-center py-[20px] ">
        <div className="w-[1130px] h-[984px] bg-background mt-4  px-0 py-0 justify-center items-center">
          {/* Row 1: Four Cards */}
          <div className="grid grid-cols-4 gap-[43px] h-[214px]">
            <div className="bg-white h-full rounded-lg "></div>
            <div className="bg-white h-full rounded-lg "></div>
            <div className="bg-white h-full rounded-lg "></div>
            <div className="bg-white h-full rounded-lg "></div>
          </div>

          {/* Row 2: Weekly Revenue */}
          <div className="h-[345px] bg-white mt-8 rounded-lg shadow-md p-4">
            <h2 className="text-[24px] font-semibold">Weekly Revenue</h2>
            <img src="/chart.png" alt="Weekly Revenue Chart" className="w-[1067px] h-[256px] mt-6" />
          </div>

          {/* Row 3: Two Equal Cards */}
          <div className="grid grid-cols-2 gap-4 h-[345px] mt-4">
            {/* Left Card - Pie Chart */}
            <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Your Pie Chart</h2>
                <div className="text-gray-500 text-sm flex items-center cursor-pointer font-bold font-sans mt-3">
                Monthly
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                    />
                </svg>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <img src="/pie.png" alt="Pie Chart" className="w-32 h-32 mt-4" />
            </div>

            {/* Additional Card */}
            <div className="px-[50px] py-3 ">
            <div className="bg-white shadow-lg rounded-lg w-[419px] h-[75px] mt-6 flex items-center justify-between px-6 py-4">
                <div className="flex flex-col items-center">
                <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                    <span className="text-gray-600 text-sm">Your Files</span>
                </div>
                <span className="text-black font-semibold text-lg">63%</span>
                </div>

                <div className="w-px h-full bg-gray-200"></div> {/* Divider line */}

                <div className="flex flex-col items-center">
                <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    <span className="text-gray-600 text-sm">System</span>
                </div>
                <span className="text-black font-semibold text-lg">25%</span>
                </div>
            </div>
            </div>
            </div>

            {/* Right Card - Daily Traffic */}
            <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <div className="flex justify-between items-center">
                <div>
                <h2 className="text-gray-400 text-[14px] font-semibold mt-3">Daily Traffic</h2>
                <div className="flex items-end">
                    <h1 className="text-3xl font-bold mt-3">2.579</h1>
                    <span className="text-gray-400 text-[14px] font-semibold ml-2">Visitors</span>
                </div>
                </div>
                <p className="text-green-500 text-sm flex items-center">
                ▲ +2.45%
                </p>
            </div>

            <div className="w-full flex justify-center">
                <img src="/bars.png" alt="Bar Chart" className="w-fill h-auto mt-4" />
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

