import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaClipboardList, FaUsers, FaUser, FaSignOutAlt, FaUserPlus, FaUniversity, FaTicketAlt } from "react-icons/fa";
import { Button } from "../Button";

// Import all tab components
import DashboardTab from "./DashboardTab";
import ManageEvents from "./ManageEvents";
import VisitorsSubscribers from "./VisitorsSubscribers";
import AdminProfile from "./AdminProfile";
import TrendingCollege from "./TrendingColleges";
import Booking from "./Booking"; // ✅ New import

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [admin, setAdmin] = useState({ name: "Admin", photo: "https://via.placeholder.com/150" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin({
        name: parsedAdmin.name || "Admin",
        photo: parsedAdmin.photo && parsedAdmin.photo.trim() !== ""
          ? parsedAdmin.photo
          : "/pie.png", // ✅ Default image
      });
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className={`bg-white w-64 p-4 shadow-lg fixed h-full md:relative transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}`}>
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Admin Dashboard</h2>

        {/* Admin Info */}
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={admin.photo}
            alt="Admin"
            className="w-12 h-12 rounded-full border object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
          />
          <span className="font-semibold text-base">{admin.name}</span>
        </div>

        <ul className="space-y-3 text-sm">
          {[
             { name: "Admin Profile", tab: "profile", icon: <FaUser /> },
            { name: "Dashboard", tab: "dashboard", icon: <FaBars /> },
            { name: "Booking", tab: "booking", icon: <FaTicketAlt /> }, 
            { name: "Manage Events", tab: "manage-events", icon: <FaClipboardList /> },
            { name: "Trending Colleges", tab: "TrendingCollege", icon: <FaUniversity /> },
            { name: "Visitors & Subscribers", tab: "visitors", icon: <FaUsers /> },
       
            
          ].map((item) => (
            <li
              key={item.tab}
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-colors font-medium ${activeTab === item.tab
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:text-blue-600"
                }`}
              onClick={() => handleTabChange(item.tab)}
            >
              {item.icon} <span className="text-base">{item.name}</span>
            </li>
          ))}
        </ul>

        {/* Admin Registration Button */}
        <button
          className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition text-base font-medium"
          onClick={() => navigate("/admin/register")}
        >
          <FaUserPlus /> Register Admin
        </button>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"} text-base`}>
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-md">
          <button className="md:hidden text-gray-600 text-xl" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Welcome, {admin.name}</h1>
          <Button variant="outline" onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" /> Logout
          </Button>
        </header>

        {/* Tab Content */}
        <div className="mt-6 transition-opacity duration-300 ease-in-out">
          {activeTab === "profile" && <AdminProfile />}
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "manage-events" && <ManageEvents />}
          {activeTab === "visitors" && <VisitorsSubscribers />}
          {activeTab === "TrendingCollege" && <TrendingCollege />}
          {activeTab === "booking" && <Booking />}
        </div>
      </main>
    </div>
  );
}
