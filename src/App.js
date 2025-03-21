// import React, { useState, useEffect } from "react";
// import { FaSearch, FaFacebook, FaInstagram } from "react-icons/fa";

// const HomePage = () => {
//   // State to store fetched events
//   const [events, setEvents] = useState([]);
//   // State to store fetched blogs
//   const [blogs, setBlogs] = useState([]);
  
//   useEffect(() => {
//     // Simulate API call to fetch events
//     setEvents([
//       { id: 1, title: "Tech Conference 2025" },
//       { id: 2, title: "Music Festival" },
//       { id: 3, title: "Startup Meetup" }
//     ]);

//     // Simulate API call to fetch blogs
//     setBlogs([
//       { id: 1, title: "How to Organize an Event" },
//       { id: 2, title: "Top 10 Event Planning Tips" },
//       { id: 3, title: "Why Networking Events Matter" }
//     ]);
//   }, []);

//   return (
//     <div className="font-sans">
//       {/* Header Section */}
//       <header className="flex justify-between items-center p-6 bg-white shadow-md">
//         <h1 className="text-3xl font-bold text-indigo-600">Event <span className="text-black">Hive</span></h1>
//         <div>
//           <button className="mr-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200">Login</button>
//           <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200">Signup</button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold" style={{ backgroundImage: "url('/Banner.png')" }}>
//         MADE FOR THOSE WHO DO !
//       </section>

//       {/* Event Search Bar */}
//       <div className="bg-indigo-600 p-6 flex justify-center gap-4 rounded-md relative -top-8 mx-auto w-3/4 shadow-lg">
//         <select className="p-3 rounded w-1/4">
//           <option>Choose event type</option>
//         </select>
//         <select className="p-3 rounded w-1/4">
//           <option>Choose location</option>
//         </select>
//         <select className="p-3 rounded w-1/4">
//           <option>Choose date and time</option>
//         </select>
//         <button className="bg-white p-3 rounded text-indigo-600"><FaSearch /></button>
//       </div>

//       {/* Upcoming Events Section */}
//       <section className="p-12">
//         <h2 className="text-3xl font-bold mb-6">Upcoming <span className="text-indigo-600">Events</span></h2>
//         <div className="grid grid-cols-3 gap-6">
//           {events.map(event => (
//             <div key={event.id} className="bg-white shadow-md p-4 rounded-lg">{event.title}</div>
//           ))}
//         </div>
//         <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg">Load more...</button>
//       </section>

//       {/* Create Your Event Section */}
//       <section className="bg-indigo-600 text-white p-12 flex justify-center items-center">
//         <div>
//           <h2 className="text-3xl font-bold">Make your own Event</h2>
//           <p className="mt-2">Create and manage your own events easily.</p>
//           <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg mt-4">Create Event</button>
//         </div>
//       </section>

//       {/* Brand Logos Section */}
//       <section className="p-12 text-center">
//         <h2 className="text-3xl font-bold">Join these <span className="text-indigo-600">brands</span></h2>
//         <div className="flex justify-center gap-8 mt-6 text-lg">
//           <img src="/Google.png" alt="Google" className="h-12" />
//           <img src="/Spotify.png " alt="Spotify" className="h-12" />
//           <img src="/Microsoft.png" alt="Microsoft" className="h-12" />
//           <img src="/Uber.png" alt="Uber" className="h-12" />
//           <img src="/Zoom.png" alt="Zoom" className="h-12" />
//           <img src="/Stripe.png" alt="Stripe" className="h-12" />
//         </div>
//       </section>

//       {/* Trending Colleges Section */}
//       <section className="p-12">
//         <h2 className="text-3xl font-bold mb-6">Trending <span className="text-indigo-600">Colleges</span></h2>
//         <div className="grid grid-cols-3 gap-6">
//           <div className="bg-white shadow-md p-4 rounded-lg">Harvard University</div>
//           <div className="bg-white shadow-md p-4 rounded-lg">Stanford University</div>
//           <div className="bg-white shadow-md p-4 rounded-lg">Nanyang University</div>
//         </div>
//       </section>

//       {/* Blog Section */}
//       <section className="p-12">
//         <h2 className="text-3xl font-bold mb-6">Our <span className="text-indigo-600">Blogs</span></h2>
//         <div className="grid grid-cols-3 gap-6">
//           {blogs.map(blog => (
//             <div key={blog.id} className="bg-white shadow-md p-4 rounded-lg">{blog.title}</div>
//           ))}
//         </div>
//         <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg">Load more...</button>
//       </section>

//       {/* Footer Section */}
//       <footer className="bg-indigo-900 text-white p-12 text-center">
//         <h2 className="text-3xl font-bold">Event <span className="text-indigo-400">Hive</span></h2>
//         <div className="mt-4">
//           <input type="email" placeholder="Enter your email" className="p-3 rounded-md w-full max-w-md" />
//           <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg ml-4">Subscribe</button>
//         </div>
//         <div className="flex justify-center gap-4 mt-6">
//           <FaFacebook className="text-white text-2xl cursor-pointer" />
//           <FaInstagram className="text-white text-2xl cursor-pointer" />
//         </div>
//         <p className="mt-6 text-gray-400">Non-Copyrighted © 2023 Uploaded by Event Hive</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;
