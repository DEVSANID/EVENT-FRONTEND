import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function AdminProfile() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    loginTime: "",
    logoutTime: "",
  });

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin({
        name: storedAdmin.name || "N/A",
        email: storedAdmin.email || "N/A",
        loginTime: storedAdmin.loginTime || "Not recorded",
        logoutTime: storedAdmin.logoutTime || "Not recorded",
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 p-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-300">
        {/* Avatar Icon */}
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-gray-500 dark:text-gray-300 text-7xl" />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Admin Profile
        </h2>

        <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-inner">
          <div className="text-lg">
            <span className="font-semibold text-gray-900 dark:text-white">Name:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">{admin.name}</span>
          </div>
          <div className="text-lg">
            <span className="font-semibold text-gray-900 dark:text-white">Email:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">{admin.email}</span>
          </div>
          <div className="text-lg">
            <span className="font-semibold text-gray-900 dark:text-white">Login Time:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">{admin.loginTime}</span>
          </div>
          <div className="text-lg">
            <span className="font-semibold text-gray-900 dark:text-white">Logout Time:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">{admin.logoutTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
