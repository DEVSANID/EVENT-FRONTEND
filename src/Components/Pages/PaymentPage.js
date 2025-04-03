import React, { useEffect } from "react";

const PaymentPage = () => {
  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_YourTestKeyHere", // Replace with your Razorpay Test Key
      amount: 50000, // Amount in paisa (₹500)
      currency: "INR",
      name: "Test Event",
      description: "Payment for Test Event",
      image: "https://your-logo-url.com/logo.png", // Optional
      handler: function (response) {
        alert("Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Test User",
        email: "testuser@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Test Payment Page</h2>
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
      >
        Pay ₹500 (Test Mode)
      </button>
    </div>
  );
};

export default PaymentPage;
