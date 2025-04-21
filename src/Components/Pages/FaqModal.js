import React, { useState } from "react";

const FaqModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <li
        onClick={() => setOpen(true)}
        className="cursor-pointer hover:text-purple-300"
      >
        FAQs
      </li>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl max-w-2xl w-full p-6 relative overflow-y-auto max-h-[80vh]">
            <button
              className="absolute top-3 right-4 text-lg font-bold text-gray-500 hover:text-red-500"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              <div>
                <strong>1. What is Event Hive?</strong>
                <p>Event Hive is a platform for discovering, booking, and managing events.</p>
              </div>
              <div>
                <strong>2. How do I book an event?</strong>
                <p>Click "Book Now" on any event, complete the Razorpay payment, and get your ticket in "My Bookings".</p>
              </div>
              <div>
                <strong>3. Where can I find my tickets?</strong>
                <p>You can find and download tickets from the "My Bookings" section in your profile.</p>
              </div>
              <div>
                <strong>4. What is the Event Shop?</strong>
                <p>Buy event-related merchandise and manage orders under "My Orders".</p>
              </div>
              <div>
                <strong>5. Can I cancel a booking?</strong>
                <p>Currently, cancellations are not supported through the app. Contact the organizer directly.</p>
              </div>
              <div>
                <strong>6. How do I become an organizer?</strong>
                <p>Sign up as an organizer and you'll be able to access the event creation dashboard.</p>
              </div>
              <div>
                <strong>7. What payment methods are supported?</strong>
                <p>We support Razorpay which includes UPI, cards, wallets, and net banking.</p>
              </div>
              <div>
                <strong>8. How do I know if my payment was successful?</strong>
                <p>You'll receive a confirmation and the ticket will appear in your profile.</p>
              </div>
              <div>
                <strong>9. Is my data secure?</strong>
                <p>Yes, we use secure authentication and encrypted transactions to keep your data safe.</p>
              </div>
              <div>
                <strong>10. How can I contact support?</strong>
                <p>You can reach out via the "Get in touch" link in the footer or email our support team.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FaqModal;
