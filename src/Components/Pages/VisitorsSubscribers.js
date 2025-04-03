import { useEffect, useState } from "react";
import axios from "axios";

export default function VisitorsSubscribers() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVisits, setTotalVisits] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [clearingVisitors, setClearingVisitors] = useState(false);
  const [clearingVisits, setClearingVisits] = useState(false);

  useEffect(() => {
    fetchVisitors();
    fetchVisitorStats();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/visitors");
      setVisitors(response.data);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVisitorStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/visitors/stats");
      setTotalVisits(response.data.totalVisits);
      setUniqueVisitors(response.data.uniqueVisitors);
      setSubscriberCount(response.data.subscriberCount);
    } catch (error) {
      console.error("Error fetching visitor stats:", error);
    }
  };

  const handleDelete = async (visitorId) => {
    if (!window.confirm("Are you sure you want to delete this visitor?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/visitors/${visitorId}`);
      setVisitors((prev) => prev.filter((visitor) => visitor._id !== visitorId));
      fetchVisitorStats();
    } catch (error) {
      console.error("Error deleting visitor:", error);
    }
  };

  const handleClearVisitors = async () => {
    if (!window.confirm("Are you sure you want to clear all visitors?")) return;
    setClearingVisitors(true);
    try {
      await axios.delete("http://localhost:5000/api/visitors/clear-visitors");
      setVisitors([]);
      setUniqueVisitors(0);
      setSubscriberCount(0);
    } catch (error) {
      console.error("Error clearing visitors:", error);
    } finally {
      setClearingVisitors(false);
    }
  };

  const handleClearVisits = async () => {
    if (!window.confirm("Are you sure you want to clear all visits?")) return;
    setClearingVisits(true);
    try {
      await axios.delete("http://localhost:5000/api/visitors/clear-visits");
      setTotalVisits(0);
    } catch (error) {
      console.error("Error clearing visits:", error);
    } finally {
      setClearingVisits(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading visitors...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Visitors & Subscribers</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <p className="text-xl font-semibold">👥 {totalVisits}</p>
          <p className="text-gray-700">Total Visits</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <p className="text-xl font-semibold">🔹 {uniqueVisitors}</p>
          <p className="text-gray-700">Unique Visitors</p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg text-center">
          <p className="text-xl font-semibold">📩 {subscriberCount}</p>
          <p className="text-gray-700">Subscribers</p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        {visitors.length > 0 && (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleClearVisitors}
            disabled={clearingVisitors}
          >
            {clearingVisitors ? "Clearing..." : "Clear Visitors"}
          </button>
        )}
        {totalVisits > 0 && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleClearVisits}
            disabled={clearingVisits}
          >
            {clearingVisits ? "Clearing..." : "Clear Visits"}
          </button>
        )}
      </div>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Last Visited</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor._id} className="border-t">
              <td className="p-3">{visitor.name || "Anonymous"}</td>
              <td className="p-3">{visitor.email || "N/A"}</td>
              <td className="p-3">
                <span className={visitor.isSubscribed ? "text-green-600" : "text-red-600"}>
                  {visitor.isSubscribed ? "Subscribed" : "Not Subscribed"}
                </span>
              </td>
              <td className="p-3">
                {visitor.visitedAt ? new Date(visitor.visitedAt).toLocaleString() : "First Visit"}
              </td>
              <td className="p-3">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(visitor._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
