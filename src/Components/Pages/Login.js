import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext"; 
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { login } = useContext(AuthContext); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { user, token } = response.data; // Extract user & token
      login(user, token); // Store in AuthContext & localStorage

      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      axios
        .post("http://localhost:5000/api/visitors", {
          name: storedUser.name,
          email: storedUser.email,
          isSubscribed: storedUser.isSubscribed || false,
        })
        .catch((error) => console.error("Error tracking visitor:", error));
    }
  }, []);

  return (
    <div className={`relative flex justify-center items-center min-h-screen p-4 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-50"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      />

      <motion.div 
        className={`relative w-full max-w-[1440px] min-h-[900px] flex flex-col lg:grid lg:grid-cols-3 ${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg rounded-lg shadow-lg overflow-hidden`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`w-full lg:col-span-2 flex justify-center items-center ${darkMode ? "bg-gray-700/80" : "bg-white/80"} order-2 lg:order-1 p-6 rounded-l-lg shadow-xl`}> 
          <div className="w-[90%] max-w-[578px] flex flex-col justify-center text-center">
            <h2 className={`text-4xl font-extrabold mb-6 ${darkMode ? "text-white" : "text-black"}`}>
              Welcome Back to <span className="text-primary">Event Hive</span>
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-[46px] p-3 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full h-[46px] p-3 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white p-3 rounded-lg hover:bg-purple-600 transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
            <div className="flex items-center justify-center mt-4">
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Or continue with</span>
            </div>
            <div className="flex justify-center mt-3">
              <button className="w-full flex justify-center items-center gap-2 border p-3 rounded-lg hover:bg-gray-200 transition">
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>

        <div 
          className="w-full lg:col-span-1 flex items-center justify-center bg-cover bg-center relative min-h-[500px] lg:min-h-[900px] order-1 lg:order-2 rounded-r-lg shadow-xl"
          style={{ backgroundImage: "url('/sign.png')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-r-lg"></div>
          <div className="relative text-center text-white px-6">
            <h2 className="text-3xl font-bold mb-2">New Here?</h2>
            <p className="text-sm mt-4 mb-4">Join us today and explore amazing events.</p>
            <button onClick={() => navigate("/signup")} className="mt-4 bg-white text-black px-4 py-2 rounded border hover:bg-gray-200 transition">Sign Up</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
