import { useState } from "react";

const BlogForm = ({ darkMode, onNewBlog }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Blog Created:", data);
      alert("Blog added successfully!");
      
      // Call the callback with the new blog
      if (onNewBlog) {
        onNewBlog({
          id: data._id || Date.now(), // Use server ID or fallback to timestamp
          title,
          date,
          location,
          image: data.imageUrl || URL.createObjectURL(image) // Use server URL or create local blob URL
        });
      }

      // Reset form fields
      setTitle("");
      setDate("");
      setLocation("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
        Create New Blog Post
      </h3>
      <div className="space-y-4">
        <div>
          <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Title
          </label>
          <input
            type="text"
            placeholder="Blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={`block w-full p-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          />
        </div>
        
        <div>
          <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Date
          </label>
          <input
            type="text"
            placeholder="Event date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={`block w-full p-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          />
        </div>
        
        <div>
          <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Location
          </label>
          <input
            type="text"
            placeholder="Event location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className={`block w-full p-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          />
        </div>
        
        <div>
          <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className={`block w-full text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold ${
              darkMode 
                ? 'file:bg-gray-600 file:text-white hover:file:bg-gray-500' 
                : 'file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200'
            }`}
          />
        </div>
        
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-primary hover:bg-primary-dark text-white'
          }`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Create Blog Post'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;