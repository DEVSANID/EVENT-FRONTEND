import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; // Avatar Icon

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {/* Avatar Icon */}
        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-gray-500 text-6xl" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Admin Profile
        </h2>

        <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
          <p className="text-lg text-gray-700 mb-3">
            <strong className="text-gray-900">Name:</strong> {admin.name}
          </p>
          <p className="text-lg text-gray-700 mb-3">
            <strong className="text-gray-900">Email:</strong> {admin.email}
          </p>
          <p className="text-lg text-gray-700 mb-3">
            <strong className="text-gray-900">Login Time:</strong> {admin.loginTime}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="text-gray-900">Logout Time:</strong> {admin.logoutTime}
          </p>
        </div>
      </div>
    </div>
  );
}
