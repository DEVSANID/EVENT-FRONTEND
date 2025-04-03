import { useState, useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";

export default function EventShop() {
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [cartOpen, setCartOpen] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const products = [
    { id: 1, name: "Event T-Shirt", description: "Premium quality event T-Shirt.", price: 499, image: "/Tshirt.jpg" },
    { id: 2, name: "Party Decorations", description: "Complete party decoration kit.", price: 799, image: "/party.jpg" },
    { id: 3, name: "VIP Meetup Pass", description: "Exclusive VIP meetup pass.", price: 1999, image: "/Vip.jpg" },
    { id: 4, name: "Event Poster", description: "High-quality printed event poster.", price: 299, image: "/Poster.jpg" }
  ];

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        showMessage(`${product.name} added to cart`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    const product = cart.find(item => item.id === id);
    setCart(cart.filter(item => item.id !== id));
    showMessage(`${product.name} removed from cart`);
  };

  const handlePayment = async () => {
    if (!window.Razorpay) {
      showMessage("Razorpay SDK failed to load. Are you online?", "error");
      return;
    }
    
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const options = {
      key: "rzp_test_7smP6uzurR9YWn",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Event Shop",
      description: "Purchase event items",
      handler: async function (response) {
        showMessage("Payment Successful!");
        
        const token = localStorage.getItem("token");
        try {
          const res = await fetch("http://localhost:5000/api/orders/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              items: cart,
              totalAmount,
              paymentId: response.razorpay_payment_id,
            }),
          });

          if (res.ok) {
            showMessage("Order saved successfully!");
            setCart([]);
          } else {
            showMessage("Failed to save order!", "error");
          }
        } catch (error) {
          console.error("Order saving error:", error);
          showMessage("Error saving order", "error");
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999"
      },
      theme: { color: "#3399cc" }
    };
    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="container mx-auto p-6 relative">
      {/* Message Notification */}
      {message.text && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          message.type === "error" ? "bg-red-500" : "bg-green-500"
        } text-white transition-all duration-300`}>
          {message.text}
        </div>
      )}

      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center py-16 rounded-xl shadow-xl mb-10">
        <h1 className="text-5xl font-extrabold">Welcome to the Event Shop</h1>
        <p className="mt-3 text-lg">Find the best event-related merchandise and accessories!</p>
      </div>
      
      <div className="flex justify-between mb-6">
        <select
          className="p-2 border rounded-lg"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
        </select>
        <button onClick={() => setCartOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
          <ShoppingCart className="w-5 h-5 mr-2" /> Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="shadow-lg rounded-lg overflow-hidden border p-4 flex flex-col h-full">
            <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="object-contain w-full h-full" 
              />
            </div>
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold mt-2">₹{product.price}</p>
            </div>
            <button 
              onClick={() => addToCart(product)} 
              className="mt-4 bg-blue-600 text-white w-full py-2 rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      {cartOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button onClick={() => setCartOpen(false)} className="absolute top-2 right-2">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center py-2 border-b">
                    <span>{item.name} (x{item.quantity})</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <button onClick={handlePayment} className="mt-4 bg-green-600 text-white w-full py-2 rounded-lg">
                Proceed to Payment
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}