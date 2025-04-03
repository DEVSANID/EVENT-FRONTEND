import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { jsPDF } from "jspdf"; // Import jsPDF library

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from URL
  const { user } = useContext(AuthContext); // Access the user state from context
  const [event, setEvent] = useState(null);
  const [attendee, setAttendee] = useState({
    name: "",
    email: "",
    tickets: 1,
    mobile: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
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

        // Send booking data to backend
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
              amountPaid: totalAmount / 100,  // ✅ Store amount paid (convert from paise to ₹)
              paymentId: response.razorpay_payment_id,
            }),
          });

          if (res.ok) {
            setMessage("Booking confirmed!");

            // Generate PDF ticket after successful booking
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

  const generatePDF = (paymentId) => {
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text("Ticket Confirmation", 20, 20);
    doc.setFontSize(12);
    doc.text(`Event: ${event?.title || "Unknown Event"}`, 20, 30);
    doc.text(`Name: ${attendee.name}`, 20, 40);
    doc.text(`Email: ${attendee.email}`, 20, 50);
    doc.text(`Mobile: ${attendee.mobile}`, 20, 60);
    doc.text(`Tickets: ${attendee.tickets}`, 20, 70);
    doc.text(`Amount Paid: ₹${500 * attendee.tickets}`, 20, 80);
    doc.text(`Payment ID: ${paymentId}`, 20, 90); // Corrected Payment ID
  
 
  
   

    // Save the generated PDF
    doc.save(`${attendee.name}_ticket.pdf`);
  };

  if (!event) return <p className="text-center">Loading event details...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
        <img src={event.imageUrl || "https://via.placeholder.com/600"} alt={event.title} className="w-full h-64 object-cover rounded-lg" />

        <h2 className="text-2xl font-bold mt-4">{event.title}</h2>
        <p className="text-gray-600">{event.description}</p>
        <p className="text-lg font-semibold mt-2">Date: {event.startDate} - {event.endDate}</p>
        <p className="text-lg font-semibold">Venue: {event.venue}</p>
        <p className="text-lg font-semibold">Price: ₹500 per ticket</p>

        {/* Attendee Form */}
        {user ? (
          <div className="mt-4 space-y-3">
            <input type="text" placeholder="Full Name" value={attendee.name} onChange={(e) => setAttendee({ ...attendee, name: e.target.value })} className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email" value={attendee.email} onChange={(e) => setAttendee({ ...attendee, email: e.target.value })} className="w-full p-2 border rounded" />
            <input type="number" min="1" placeholder="Tickets" value={attendee.tickets} onChange={(e) => setAttendee({ ...attendee, tickets: e.target.value })} className="w-full p-2 border rounded" />
            <input type="tel" placeholder="Mobile" value={attendee.mobile} onChange={(e) => setAttendee({ ...attendee, mobile: e.target.value })} className="w-full p-2 border rounded" />
          </div>
        ) : (
          <p className="text-red-600">Please log in to make a booking.</p>
        )}

        {/* Payment Button */}
        {user && (
          <button onClick={handlePayment} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700">
            Pay ₹{500 * attendee.tickets} (Test Mode)
          </button>
        )}

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default EventDetails;
