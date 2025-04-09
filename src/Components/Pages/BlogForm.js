import { useState } from "react";

const BlogForm = ({ darkMode, onNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", isError: false });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
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
      setMessage({ text: "Blog added successfully!", isError: false });

      if (onNewBlog) {
        onNewBlog({
          id: data._id || Date.now(),
          title: data.title,
          author: data.author,
          content: data.content,
          date: data.date,
          location: data.location,
          imageUrl: data.imageUrl,
        });
      }

      // Clear form fields
      setTitle("");
      setAuthor("");
      setContent("");
      setDate("");
      setLocation("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "Failed to add blog", isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-black"}`}>
        Create New Blog Post
      </h3>
      
      {/* Message display */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.isError
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        {/* Title */}
        <FormField
          label="Title"
          value={title}
          setValue={setTitle}
          placeholder="Blog title"
          darkMode={darkMode}
        />

        {/* Author */}
        <FormField
          label="Author"
          value={author}
          setValue={setAuthor}
          placeholder="Author name"
          darkMode={darkMode}
        />

        {/* Blog Content */}
        <div>
          <label className={`block mb-1 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Blog Content
          </label>
          <textarea
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className={`block w-full p-2 rounded-md border resize-none ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />
        </div>

        {/* Date */}
        <FormField
          label="Date"
          value={date}
          setValue={setDate}
          placeholder="Event date"
          darkMode={darkMode}
        />

        {/* Location */}
        <FormField
          label="Location"
          value={location}
          setValue={setLocation}
          placeholder="Event location"
          darkMode={darkMode}
        />

        {/* Image */}
        <div>
          <label className={`block mb-1 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className={`block w-full text-sm ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold ${
              darkMode
                ? "file:bg-gray-600 file:text-white hover:file:bg-gray-500"
                : "file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            }`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary-dark text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Create Blog Post"}
        </button>
      </div>
    </form>
  );
};

const FormField = ({ label, value, setValue, placeholder, darkMode }) => (
  <div>
    <label className={`block mb-1 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
      className={`block w-full p-2 rounded-md border ${
        darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
      }`}
    />
  </div>
);

export default BlogForm;