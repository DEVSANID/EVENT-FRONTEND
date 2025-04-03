import React, { useState, useEffect, useRef } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa"; // Import icons
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import "../../index.css";
const Chatbot = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Create a ref for the chat container
  const chatContainerRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Animation variants for chat messages
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user", content: input, isTyping: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate typing effect for the bot's response
    setIsTyping(true);

    // Send message to backend
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { role: "assistant", content: data.message, isTyping: true };

      // Add the bot's response with a typing effect
      setMessages((prev) => [...prev, botMessage]);

      // Simulate typing delay
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg === botMessage ? { ...msg, isTyping: false } : msg
          )
        );
        setIsTyping(false);
      }, 1000); // Adjust typing speed (1 second delay)
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary p-4 rounded-full shadow-lg hover:bg-primary-dark transition"
      >
        {isOpen ? (
          <FaTimes size={24} className="text-white" />
        ) : (
          <FaCommentDots size={24} className="text-white" />
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          className={`absolute bottom-16 right-0 w-96 h-[500px] ${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-lg p-4 flex flex-col`}
        >
          {/* Chatbot Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Event Hive Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FaTimes size={18} className={darkMode ? "text-white" : "text-gray-800"} />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef} // Attach the ref to the chat container
            className="flex-1 overflow-y-auto mb-4"
          >
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={messageVariants}
                  transition={{ duration: 0.3 }}
                  className={`mb-2 ${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg max-w-[80%] break-words text-base ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    {msg.isTyping ? (
                      <span className="typing-indicator">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    ) : (
                      msg.content
                    )}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg max-w-[80%] break-words text-base bg-gray-200 dark:bg-gray-700">
                  <span className="typing-indicator">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className={`flex-1 p-2 border rounded-lg ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary p-2 rounded-lg text-white hover:bg-primary-dark transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;