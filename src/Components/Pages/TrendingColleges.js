import { useState, useEffect } from "react";

const TrendingCollege = ({ darkMode }) => {
  const [colleges, setColleges] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/colleges/trending?page=${page}&limit=6`);
      const data = await response.json();
      const newColleges = data.colleges || data;
      
      setColleges(prev => {
        const collegeMap = new Map(prev.map(college => [college._id, college]));
        newColleges.forEach(college => collegeMap.set(college._id, college));
        return Array.from(collegeMap.values());
      });
      
      setHasMore(data.hasMore !== undefined ? data.hasMore : newColleges.length > 0);
    } catch (error) {
      setMessage("Error fetching colleges.");
      console.error("Fetch error:", error);
    }
  };

  const loadMoreColleges = async () => {
    if (!hasMore || loadingMore) return;
    
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(`http://localhost:5000/api/colleges/trending?page=${nextPage}&limit=6`);
      const data = await response.json();
      const newColleges = data.colleges || data;
      
      setColleges(prev => {
        const collegeMap = new Map(prev.map(college => [college._id, college]));
        newColleges.forEach(college => collegeMap.set(college._id, college));
        return Array.from(collegeMap.values());
      });
      
      setHasMore(data.hasMore !== undefined ? data.hasMore : newColleges.length > 0);
      setPage(nextPage);
    } catch (error) {
      setMessage("Error loading more colleges.");
      console.error("Load more error:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("rating", rating);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const url = editingId
        ? `http://localhost:5000/api/colleges/update/${editingId}`
        : "http://localhost:5000/api/colleges/create";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessage(data.message || (editingId ? "College updated successfully!" : "College added successfully!"));
      // Reset to first page after adding/editing
      setPage(1);
      fetchColleges();
      resetForm();
    } catch (error) {
      setMessage("Failed to process request.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (college) => {
    setEditingId(college._id);
    setName(college.name);
    setLocation(college.location);
    setRating(college.rating);
    setDescription(college.description || "");
    setImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setMessage("");
    try {
      const response = await fetch(`http://localhost:5000/api/colleges/delete/${deleteId}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessage(data.message || "College deleted successfully!");
      // Reset to first page after deletion
      setPage(1);
      fetchColleges();
    } catch (error) {
      setMessage("Failed to delete college.");
      console.error("Delete error:", error);
    }
    setDeleteId(null);
  };

  const resetForm = () => {
    setName("");
    setLocation("");
    setRating("");
    setDescription("");
    setImage(null);
    setEditingId(null);
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h3 className="text-2xl font-bold mb-4">{editingId ? "Edit College" : "Add New College"}</h3>
      {message && (
        <p className={`mb-4 text-sm font-medium ${
          message.includes("success") ? "text-green-500" : "text-red-500"
        }`}>
          {message}
        </p>
      )}

      {deleteId && (
        <div className="mb-4 p-4 border rounded-lg bg-red-100 text-center">
          <p className="text-red-600 font-semibold">Are you sure you want to delete this college?</p>
          <div className="mt-3 flex justify-center space-x-4">
            <button 
              onClick={confirmDelete} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Yes
            </button>
            <button 
              onClick={() => setDeleteId(null)} 
              className="bg-gray-300 text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="College Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:ring focus:ring-purple-300"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:ring focus:ring-purple-300"
        />
        <input
          type="text"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:ring focus:ring-purple-300"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:ring focus:ring-purple-300"
          rows="3"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">College Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-700"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-semibold shadow-md transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : editingId ? "Update College" : "Add College"}
        </button>
      </form>

      <h3 className="text-2xl font-bold mt-8 mb-4">Trending Colleges</h3>
      {colleges.length === 0 && !loadingMore ? (
        <p className="text-center text-gray-500 py-8">No colleges found. Add one to get started!</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <div key={college._id} className="p-4 rounded-lg shadow-lg bg-gray-100 hover:shadow-xl transition-all">
                <img 
                  src={college.image} 
                  alt={college.name} 
                  className="w-full h-40 object-cover rounded-lg mb-4 shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <h4 className="text-lg font-semibold text-gray-900">{college.name}</h4>
                <p className="text-sm text-gray-600">{college.location}</p>
                <p className="text-sm font-semibold text-yellow-500">⭐ {college.rating}</p>
                <p className="text-sm text-gray-700 mt-2 line-clamp-3">{college.description}</p>
                <div className="mt-3 flex justify-between">
                  <button 
                    onClick={() => handleEdit(college)} 
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setDeleteId(college._id)} 
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMoreColleges}
                className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-all ${
                  loadingMore ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrendingCollege;