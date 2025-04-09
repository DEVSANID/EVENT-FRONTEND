import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { jsPDF } from "jspdf";
import { DarkModeContext } from "../context/DarkModeContext";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const [event, setEvent] = useState(null);
  const [attendee, setAttendee] = useState({
    name: "",
    email: "",
    tickets: 1,
    mobile: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!response.ok) throw new Error("Failed to fetch event details");
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!user) {
      setMessage("Please log in to make a booking.");
      return;
    }

    if (!window.Razorpay) {
      setMessage("Razorpay SDK failed to load.");
      return;
    }

    const totalAmount = 500 * attendee.tickets * 100;

    const options = {
      key: "rzp_test_7smP6uzurR9YWn",
      amount: totalAmount,
      currency: "INR",
      name: event?.title || "Event",
      description: `Payment for ${event?.title || "Event"}`,
      image: event?.imageUrl || "https://via.placeholder.com/600",
      handler: async function (response) {
        setMessage(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        setIsBookingSuccess(true);

        try {
          const res = await fetch("http://localhost:5000/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventId: event._id,
              name: attendee.name,
              email: attendee.email,
              mobile: attendee.mobile,
              tickets: attendee.tickets,
              amountPaid: totalAmount / 100,
              paymentId: response.razorpay_payment_id,
            }),
          });

          if (res.ok) {
            setMessage("Booking confirmed!");
            generatePDF(response.razorpay_payment_id);
          } else {
            setMessage("Booking failed!");
          }
        } catch (error) {
          console.error("Booking error:", error);
        }
      },
      prefill: {
        name: attendee.name,
        email: attendee.email,
        contact: attendee.mobile,
      },
      theme: { color: "#3399cc" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const generatePDF = async (paymentId) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Ticket Confirmation", 20, 20);
    doc.setFontSize(12);
    doc.text(`Event: ${event?.title || "Unknown Event"}`, 20, 30);
    doc.text(`Name: ${attendee.name}`, 20, 40);
    doc.text(`Email: ${attendee.email}`, 20, 50);
    doc.text(`Mobile: ${attendee.mobile}`, 20, 60);
    doc.text(`Tickets: ${attendee.tickets}`, 20, 70);
    doc.text(`Amount Paid: ${500 * attendee.tickets}`, 20, 80);
    doc.text(`Payment ID: ${paymentId}`, 20, 90);

    const base64 = doc.output("datauristring").split(",")[1];

    try {
      const res = await fetch("http://localhost:5000/api/tickets/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event._id,
          userId: user._id,
          paymentId,
          ticketPdf: `data:application/pdf;base64,${base64}`,
          name: attendee.name,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ticketPath) {
        const downloadUrl = `http://localhost:5000${data.ticketPath}`;
        window.open(downloadUrl, '_blank'); // Open in new tab
      } else {
        console.error("Ticket uploaded but no download path returned.");
      }
    } catch (err) {
      console.error("Error uploading or downloading PDF:", err);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <p>Failed to load event details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className={`max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        {/* Event Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={event.imageUrl || "https://via.placeholder.com/600"}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{event.title}</h1>
            <p className="text-gray-200 mt-1">{event.venue}</p>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Event Information</h2>
              <div className="space-y-3">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {event.startDate} - {event.endDate}
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.venue}
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ₹500 per ticket
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{event.description}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Book Tickets</h2>
            
            {!user ? (
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <p className="text-center">
                  <span className="text-red-500 mr-2">⚠️</span>
                  Please log in to make a booking.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={`block mb-1 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Full Name</label>
                    <input
                      type="text"
                      value={attendee.name}
                      onChange={(e) => setAttendee({ ...attendee, name: e.target.value })}
                      className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-500" : "bg-white border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-1 focus:ring-blue-500 transition`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className={`block mb-1 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Email</label>
                    <input
                      type="email"
                      value={attendee.email}
                      onChange={(e) => setAttendee({ ...attendee, email: e.target.value })}
                      className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-500" : "bg-white border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-1 focus:ring-blue-500 transition`}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className={`block mb-1 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Mobile Number</label>
                    <input
                      type="tel"
                      value={attendee.mobile}
                      onChange={(e) => setAttendee({ ...attendee, mobile: e.target.value })}
                      className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-500" : "bg-white border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-1 focus:ring-blue-500 transition`}
                      placeholder="Enter your mobile number"
                    />
                  </div>
                  <div>
                    <label className={`block mb-1 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Number of Tickets</label>
                    <input
                      type="number"
                      min="1"
                      value={attendee.tickets}
                      onChange={(e) => setAttendee({ ...attendee, tickets: e.target.value })}
                      className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-500" : "bg-white border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-1 focus:ring-blue-500 transition`}
                      placeholder="Enter number of tickets"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className={`p-4 mb-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <p className="font-medium text-center">
                      Total Amount: <span className="text-blue-600 dark:text-blue-400 font-bold">₹{500 * attendee.tickets}</span>
                    </p>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Pay Now (Test Mode)
                  </button>
                </div>
              </>
            )}

            {message && (
              <div className={`mt-4 p-3 rounded-lg text-center ${message.includes("Successful") || message.includes("confirmed") ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}>
                {message}
                {isBookingSuccess && (
                  <div className="mt-3">
                    <a 
                      href="/" 
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                    >
                      Back to Homepage
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;