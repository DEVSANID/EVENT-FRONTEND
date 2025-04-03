import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaClipboardList, FaUsers, FaUser, FaSignOutAlt, FaUserPlus, FaUniversity } from "react-icons/fa";
import { Button } from "../Button";

// Import all tab components
import DashboardTab from "./DashboardTab";
import ManageEvents from "./ManageEvents";
import VisitorsSubscribers from "./VisitorsSubscribers";
import AdminProfile from "./AdminProfile";
import TrendingCollege from "./TrendingColleges"; 

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white w-64 p-4 shadow-lg fixed h-full md:relative transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}`}>
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

        {/* Admin Info */}
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={admin.photo}
            alt="Admin"
            className="w-12 h-12 rounded-full border object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }} 
          />
          <span className="font-semibold">{admin.name}</span>
        </div>

        <ul className="space-y-4">
          {[
            { name: "Dashboard", tab: "dashboard", icon: <FaBars /> },
            { name: "Manage Events", tab: "manage-events", icon: <FaClipboardList /> },
            { name: "Visitors & Subscribers", tab: "visitors", icon: <FaUsers /> },
            { name: "Admin Profile", tab: "profile", icon: <FaUser /> },
            { name: "Trending Colleges", tab: "TrendingCollege", icon: <FaUniversity /> },
          ].map((item) => (
            <li
              key={item.tab}
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-colors ${activeTab === item.tab ? "bg-blue-100 text-blue-600 font-bold" : "hover:text-blue-600"}`}
              onClick={() => handleTabChange(item.tab)}
            >
              {item.icon} <span>{item.name}</span>
            </li>
          ))}
        </ul>

        {/* Admin Registration Button */}
        <button
          className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          onClick={() => navigate("/admin/register")}
        >
          <FaUserPlus /> Register Admin
        </button>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 shadow-md">
          <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <h1 className="text-2xl font-semibold">Welcome, {admin.name}</h1>
          <Button variant="outline" onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" /> Logout
          </Button>
        </header>

        {/* Tab Content */}
        <div className="mt-6 transition-opacity duration-300 ease-in-out">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "manage-events" && <ManageEvents />}
          {activeTab === "visitors" && <VisitorsSubscribers />}
          {activeTab === "profile" && <AdminProfile />}
          {activeTab === "TrendingCollege" && <TrendingCollege />} 
        </div>
      </main>
    </div>
  );
}
