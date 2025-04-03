import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">My Orders</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-6 rounded-xl shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Order #{order._id}</h2>
              <p className="text-gray-500 text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <ul className="mt-4 border-t pt-3 divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between py-2 text-gray-700">
                    <span>{item.name} (x{item.quantity})</span>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-bold text-gray-800">Total: ₹{order.totalAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
