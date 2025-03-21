import React, { useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext"; // Import DarkModeContext

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(DarkModeContext); // Use DarkModeContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen p-4 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`w-full max-w-md ${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-lg`}>
        <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? "text-white" : "text-black"}`}>Forgot Password</h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Email Address</label>
          <input
            type="email"
            className={`w-full p-2 border rounded mt-2 mb-4 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-purple-600">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;