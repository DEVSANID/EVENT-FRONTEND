import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/visitors") // Fetch visitors from backend
      .then((response) => {
        setVisitors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visitors:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (visitorId) => {
    if (!window.confirm("Are you sure you want to delete this visitor?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/visitors/${visitorId}`);
      setVisitors(visitors.filter((visitor) => visitor._id !== visitorId));
    } catch (error) {
      console.error("Error deleting visitor:", error);
    }
  };

  if (loading) return <p>Loading visitors...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Visitors & Subscribers</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Subscribed</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor._id} className="border">
              <td className="border p-2">{visitor.name}</td>
              <td className="border p-2">{visitor.email}</td>
              <td className="border p-2">
                {visitor.subscribed ? "Yes" : "No"}
              </td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
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
