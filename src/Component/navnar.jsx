import React from "react";

const Navbar = () => {
  return (
    <div className="navbar h-dvh bg-red-400 flex flex-col w-60 shadow-lg">
      <div className="container mx-auto">
        <div className="text-white font-bold text-xl p-2">Super Market</div>
        <div className="flex flex-col items-start space-y-4 p-6">
          <a href="#" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Services
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Contact
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
