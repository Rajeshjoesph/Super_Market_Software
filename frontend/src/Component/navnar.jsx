import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NotificationIcon from "./NotificationIcon";
import NotificationList from "./NotificationList";
import { storeContext } from "../Context/StoreContext";
const sidebarData = [
  {
    icon: "",
    title: "Sale Bill",
    link: "/Sale",
    roles: ["admin", "inventoryManager", "salesman", "Grn"],
  },
  {
    icon: "",
    title: "View Bill",
    link: "/ViewBill",
    roles: ["admin", "inventoryManager", "salesman", "Grn"],
  },
  {
    icon: "",
    title: "Purchase Entry",
    link: "/PurchaseEntry",
    roles: ["admin", "inventoryManager", "purchaser", "Grn"],
  },
  {
    icon: "",
    title: "Purchase History",
    link: "/PurchaseHistory",
    roles: ["admin", "inventoryManager", "purchaser", "Grn"],
  },
  {
    icon: "",
    title: "Create Product",
    link: "/create",
    roles: ["admin", "inventoryManager", "purchaser", "Grn"],
  },
  {
    icon: "",
    title: "View Product",
    link: "/Allproduct",
    roles: ["admin", "inventoryManager", "purchaser", "Grn"],
  },
  {
    icon: "",
    title: "Open Stock details",
    link: "/OpeningStockView",
    roles: ["admin", "inventoryManager", "purchaser", "Grn", "salesman"],
  },
  {
    icon: "",
    title: "Create User",
    link: "/SigUp",
    roles: ["admin", "inventoryManager", "purchaser", "Grn", "salesman"],
  },
  {
    icon: "",
    title: "User Detail",
    link: "/AllUsers",
    roles: ["admin", "inventoryManager"],
  },
  {
    icon: "",
    title: "Notification",
    link: "/Notification",
    roles: ["admin", "inventoryManager", "purchaser"],
  },
];

const Navbar = () => {
  const { users } = useContext(storeContext);
  const user = users[0];
  const userRole = user?.role || "";
  // console.log(user);

  return (
    <div className="navbar h-dvh bg-red-400 flex flex-col w-60 shadow-lg">
      <div className="container mx-auto">
        <div className="text-white font-bold text-xl p-2">Super Market</div>
        <div>
          {" "}
          <NotificationIcon />
          <NotificationList />
        </div>
        <div className="flex flex-col items-start space-y-4 p-6">
          {sidebarData
            .filter((items) => items.roles.includes(userRole))
            .map((items, index) => (
              <Link
                key={index}
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
