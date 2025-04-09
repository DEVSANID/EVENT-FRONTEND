import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { motion } from "framer-motion";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(DarkModeContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You need to be logged in to view your orders.");
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(
          error.response?.data?.message || "Failed to fetch orders. Please try again later."
        );
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className={`min-h-screen px-4 py-10 ${darkMode ? "bg-gray-900 text-gray-100" : "text-gray-800"}`}>
      <div className="max-w-6xl mx-auto">
        <h1
          className={`text-4xl font-extrabold text-center mb-10 tracking-wide 
              text-white drop-shadow-md`}
        >
          My Orders
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`rounded-2xl shadow-md p-6 transition-all duration-300 
                            ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
              >
                <h2 className="text-lg font-semibold mb-2">
                  <span className="text-indigo-500 dark:text-indigo-400">Order ID:</span> {order._id}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="space-y-2 border-t border-dashed border-gray-300 dark:border-gray-600 pt-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.name} <span className="text-xs text-gray-400">(x{item.quantity})</span></span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-right text-base font-bold text-indigo-600 dark:text-indigo-400">
                  Total: ₹{order.totalAmount}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
