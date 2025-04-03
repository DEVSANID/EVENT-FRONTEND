import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function DashboardTab() {
  const [data, setData] = useState({
    users: 0,
    visitors: 0,
    bookedEvents: 0,
    totalEvents: 0,
    totalRevenueTickets: 0,
    totalRevenueShop: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, orderRevenueRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/stats"),
          axios.get("http://localhost:5000/api/orders/total-revenue-orders")
        ]);

        console.log("Dashboard Stats:", statsRes.data);
        console.log("Order Revenue:", orderRevenueRes.data);

        setData({
          users: statsRes.data.totalUsers || 0,
          visitors: statsRes.data.totalVisitors || 0,
          bookedEvents: statsRes.data.totalBookedEvents || 0,
          totalEvents: statsRes.data.totalEvents || 0,
          totalRevenueTickets: statsRes.data.totalRevenueTickets || 0,
          totalRevenueShop: statsRes.data.totalRevenueShop || 0,
          totalRevenueOrders: orderRevenueRes.data.totalRevenue || 0, // Make sure this is included
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading dashboard data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const chartData = [
    { name: "Users", value: data.users },
    { name: "Visitors", value: data.visitors },
    { name: "Booked Events", value: data.bookedEvents },
    { name: "Total Events", value: data.totalEvents },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Dashboard Overview</h2>
      <p className="text-gray-600">Welcome to your admin dashboard! Here's an overview of the system.</p>

      {/* Revenue Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg text-center shadow-md">
          <h3 className="text-lg font-semibold text-blue-800">Total Revenue from Tickets</h3>
          <p className="text-2xl font-bold text-blue-900">
            ₹{(data.totalRevenueTickets || 0).toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-purple-100 rounded-lg text-center shadow-md">
          <h3 className="text-lg font-semibold text-purple-800">Total Revenue from Orders</h3>
          <p className="text-2xl font-bold text-purple-900">
            ₹{(data.totalRevenueOrders || 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mt-8">
        <PieChart key={Date.now()} width={600} height={400}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4facfe" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
          </defs>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="url(#colorGradient)"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            animationDuration={500}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px" }} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>
    </div>
  );
}
