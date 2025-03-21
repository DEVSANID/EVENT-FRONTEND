import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext"; // Import DarkModeContext

const ResetPassword = () => {
    const { token } = useParams(); // Extract token from URL
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const { darkMode } = useContext(DarkModeContext); // Use DarkModeContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
                newPassword,
                confirmNewPassword
            });
            setMessage(response.data.message);

            // Redirect to the login page after successful password reset
            setTimeout(() => {
                navigate("/login"); // Redirect to login page
            }, 2000); // Optional delay before redirect
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className={`flex justify-center items-center min-h-screen p-4 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <div className={`w-full max-w-md ${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-lg`}>
                <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? "text-white" : "text-black"}`}>Reset Password</h2>
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>New Password</label>
                    <input
                        type="password"
                        className={`w-full p-2 border rounded mt-2 mb-4 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Confirm Password</label>
                    <input
                        type="password"
                        className={`w-full p-2 border rounded mt-2 mb-4 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
                        placeholder="Confirm new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;