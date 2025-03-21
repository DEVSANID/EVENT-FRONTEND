import React from "react";
import { FaLinkedin, FaInstagram, FaRegCircle } from "react-icons/fa";

const Footer = ({ darkMode }) => {
  return (
    <footer className={`${darkMode ? "bg-gray-900 text-gray-300" : "bg-blue-900 text-white"} py-8 px-4 md:px-16`}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-[40px] font-sans font-bold mb-4">
          Event <span className="text-purple-400">Hive</span>
        </h2>
        <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
          <div className="flex w-full sm:w-auto max-w-xs md:max-w-none">
            <input
              type="email"
              placeholder="Enter your mail"
              className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 text-white" : "text-black"} w-full sm:w-64 md:w-80 max-w-xs sm:max-w-none`}
            />
            <button className="bg-purple-500 px-6 py-2 rounded-md text-white font-semibold w-auto md:ml-2 ml-2 hover:bg-purple-600">
              Subscribe
            </button>
          </div>
        </div>
        <nav className="mt-6">
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm">
            <li className="cursor-pointer hover:text-purple-300">Home</li>
            <li className="cursor-pointer hover:text-purple-300">About</li>
            <li className="cursor-pointer hover:text-purple-300">Services</li>
            <li className="cursor-pointer hover:text-purple-300">Get in touch</li>
            <li className="cursor-pointer hover:text-purple-300">FAQs</li>
          </ul>
        </nav>
        <hr className={`${darkMode ? "border-gray-700" : "border-white"} my-3`} />
        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="flex gap-4 mt-4 md:mt-0">
            <FaLinkedin className="text-xl cursor-pointer hover:text-purple-300" />
            <FaInstagram className="text-xl cursor-pointer hover:text-purple-300" />
            <FaRegCircle className="text-xl cursor-pointer hover:text-purple-300" />
          </div>
          <p className="mt-4 md:mt-0 text-xs">Non Copyrighted © 2023 Upload by EventHive</p>
        </div>
      </div>
      <div className="flex gap-2 md:gap-4 justify-center mt-4">
        <button className="bg-purple-500 px-3 py-1 rounded-md text-white text-xs hover:bg-purple-600">
          English
        </button>
        <span className="cursor-pointer hover:text-purple-300">French</span>
        <span className="cursor-pointer hover:text-purple-300">Hindi</span>
      </div>
    </footer>
  );
};

export default Footer;