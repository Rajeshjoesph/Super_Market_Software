import React from "react";
import { Link } from "react-router-dom";
const sidebarData = [
  {
    icon: "",
    title: "Sale Bill",
    link: "/Sale",
  },
  {
    icon: "",
    title: "Purchase Entry",
    link: "/PurchaseEntry",
  },
  {
    icon: "",
    title: "Purchase History",
    link: "/PurchaseHistory",
  },
  {
    icon: "",
    title: "Create Product",
    link: "/create",
  },
  {
    icon: "",
    title: "View Product",
    link: "/Allproduct",
  },
  {
    icon: "",
    title: "Open Stock details",
    link: "/OpeningStockView",
  },
];

const Navbar = () => {
  return (
    <div className="navbar h-dvh bg-red-400 flex flex-col w-60 shadow-lg">
      <div className="container mx-auto">
        <div className="text-white font-bold text-xl p-2">Super Market</div>
        <div className="flex flex-col items-start space-y-4 p-6">
          {sidebarData.map((items) => (
            <Link
              to={items.link}
              className="text-white pb-5 hover:text-gray-500"
            >
              {items.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
