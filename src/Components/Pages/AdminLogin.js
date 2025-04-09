import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../Button";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Validate token before redirecting
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      axios
        .get("http://localhost:5000/api/admin/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          navigate("/dashboard"); // If valid, go to dashboard
        })
        .catch(() => {
          localStorage.removeItem("adminToken"); // If invalid, remove token
        });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      const { token, admin } = response.data;

      // Store login time
      const adminData = {
        ...admin,
        loginTime: new Date().toLocaleString(),
        logoutTime: "", // Initially empty
      };

      localStorage.setItem("adminToken", token);
      localStorage.setItem("admin", JSON.stringify(adminData));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-800">
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Admin Login</h2>
        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full text-base font-semibold">Login</Button>
        </form>
      </div>
    </div>
  );
}
