import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, MapPin, ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../Footer";

const eventData = [
  { id: 1, title: "Book Bootcamp", date: "Mar 18, 9:30PM", loc: "Online", img: "/allevents.png", tag: "Hot" },
  { id: 2, title: "Tech Conf 2025", date: "Mar 19, 10:00AM", loc: "Jakarta", img: "/allevents.png", tag: "New" },
  { id: 3, title: "Digital Art", date: "Mar 17, 6:00PM", loc: "Online", img: "/allevents.png", tag: "Hot" },
  { id: 4, title: "Music Fest", date: "Mar 25, 2:00PM", loc: "Bandung", img: "/allevents.png", tag: "New" },
  { id: 5, title: "Cooking Class", date: "Mar 22, 5:00PM", loc: "Surabaya", img: "/allevents.png", tag: "Hot" },
  { id: 6, title: "Photo Exhibit", date: "Mar 23, 7:00PM", loc: "Yogyakarta", img: "/allevents.png", tag: "New" }
];

const Button = ({ onClick, className, children }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-lg ${className}`}>
    {children}
  </button>
  
);

function Events() {
  const containerClasses = "w-full max-w-[1200px] mx-auto p-4 sm:p-6 bg-white mt-4 sm:mt-6";
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`${containerClasses} flex flex-col sm:flex-row justify-between items-center`}>
        <Link to="/" className="text-2xl sm:text-[40px] font-sans font-bold mb-3 sm:mb-0">
          Event <span className="text-primary">Hive</span>
        </Link>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
          <Button onClick={() => window.location.href = '/Login'} className="mr-0 sm:mr-4 font-sans text-black hover:text-slate-900 hover:bg-slate-200 w-full sm:w-auto mb-2 sm:mb-0 sm:text-[16px]">
            Login
          </Button>
          <Button onClick={() => window.location.href = '/signup'} className="bg-primary font-sans text-white hover:text-slate-900 hover:bg-slate-200 w-full sm:w-auto sm:text-[16px]">
            Signup
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mb-12">
        {/* Event Banner */}
        <div className="relative w-full max-w-[1320px] h-[595px] mx-auto rounded-lg md:rounded-2xl overflow-hidden">
          <img src="/Events.jpg" alt="Event Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40" />

          <div className="absolute top-4 left-4">
            <Button className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-md text-sm">
              <ArrowLeft size={16} /> Back
            </Button>
          </div>

          <div className="absolute bottom-8 left-8 text-white w-[90%] sm:w-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 whitespace-nowrap">Dream world wide</h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 whitespace-nowrap">in jakarta</h2>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <h3 className="text-xl font-semibold whitespace-nowrap">IIIT Sonepat</h3>
              <div className="w-full sm:w-[600px] h-auto sm:h-[90px] p-4 rounded-lg flex items-center">
                <p className="text-sm text-white break-words">
                  DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. The workshop taught participants the magic of creating stunning 3D models and animations using Blender. It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, which added to the excitement.
                </p>
              </div>
              <Button className="flex items-center gap-1 text-sm bg-transparent border border-white rounded-full px-3 py-1 w-fit">
                <MapPin size={16} /> View map
              </Button>
            </div>
          </div>

          {/* Event Details Card */}
          <div className="absolute right-4 md:right-8 bottom-0 my-4 sm:my-[165px] mx-4 sm:mx-[165px] bg-white rounded-lg shadow-lg p-4 w-[280px] md:w-[300px]">
            <h3 className="font-semibold mb-2">Date & time</h3>
            <p className="text-sm mb-2">Saturday, March 18 2023, 9:30PM</p>
            <Button className="flex items-center justify-center gap-1 text-sm text-purple-600 mb-2">
              <Calendar size={16} /> Add to calendar
            </Button>
            <Button className="w-full bg-purple-600 text-white py-2 rounded-md mb-2">Book now</Button>
            <Button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md mb-2">Program promoter</Button>
            <p className="text-sm text-center text-gray-500">No Refunds</p>
          </div>
        </div>

        {/* Event Details Section */}
        <div className={`${containerClasses} flex flex-col items-start`}>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full">
            {/* Left Column */}
            <div className="w-full lg:w-[600px] p-0 sm:p-5">
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-sm text-gray-700 mb-4">
                  DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. The workshop taught participants the magic of creating stunning 3D models and animations using Blender. It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, which added to the excitement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Hours</h2>
                <div className="text-sm">
                  {["Weekdays", "Sunday"].map(day => (
                    <div key={day} className="flex flex-col sm:flex-row gap-2 mb-2">
                      <span>{day} hour:</span>
                      <span className="text-purple-600 font-medium">7PM - 10PM</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Organizer Contact</h2>
                <p className="text-sm text-gray-700">
                  Please go to <a href="/" className="text-purple-600">www.eventgeeks.com</a> and refer the FAQ section for more detail
                </p>
              </section>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[480px] p-0 sm:p-5">
              <section className="mb-8 h-auto lg:h-[380px]">
                <h2 className="text-xl font-bold mb-4">Event location</h2>
                <div className="bg-gray-200 h-[260px] rounded-lg mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1631&q=80"
                    alt="Map"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-semibold mb-1">Dream world wide in jakarta</h3>
                <p className="text-sm text-gray-700">
                  Dummy location generation model by ISU... Our approach generates more realistic dummy locations
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {["Indonesia event", "Jaskaran event", "UI", "Seminar"].map(tag => (
                    <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{tag}</span>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Share with friends</h2>
                <div className="flex gap-3">
                  {[
                    { Icon: Facebook, bg: "bg-blue-600" },
                    { Icon: Instagram, bg: "bg-green-500" },
                    { Icon: Linkedin, bg: "bg-blue-700" },
                    { Icon: Twitter, bg: "bg-blue-400" }
                  ].map(({ Icon, bg }, idx) => (
                    <a key={idx} href="/" className={`${bg} text-white p-2 rounded-full`}>
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Other Events Section  */}
        <div className={`${containerClasses} flex flex-col py-12`}>
  <div className="container mx-auto px-4">
    <h2 className="text-2xl font-bold mb-8">Other events you may like</h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventData.map(event => (
        <div key={event.id} className="bg-white shadow-lg rounded-xl overflow-hidden p-5">
          {/* Image Container */}
          <div className="relative w-full flex justify-center">
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-[240px] object-cover rounded-lg"
            />
            <span className="absolute top-2 left-2 bg-white text-primary text-xs font-semibold px-2 py-1 rounded">
              {event.tag === "FREE" ? "FREE" : event.tag} {/* Keeps original tag, defaults to "FREE" styling */}
            </span>
          </div>

          {/* Event Content */}
          <div className="mt-4 text-left space-y-2">
            <h3 className="text-md font-semibold leading-tight text-black">
              {event.title}
            </h3>
            <p className="text-xs font-medium text-primary leading-[2.5]">
              {event.date}
            </p>
            <p className="text-xs text-gray-600">
              {event.loc}
            </p>
          </div>
        </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Events;