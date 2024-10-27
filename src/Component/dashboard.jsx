import React, { useContext } from "react";
// import Navbar from "./navnar";
import Button from "./button";
import Allproducts from "../product/Allproducts";
import CreateProduct from "../product/Newproduct";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navnar";
import Dashbord from "../Admin/AdminItem";
import Notification from "./Notification";
import { storeContext } from "../Context/StoreContext";
import { capitalize } from "@mui/material";
const Dashboard = () => {
  const { users } = useContext(storeContext);

  const capitalize =
    users[0].role.charAt(0).toUpperCase() + users[0].role.slice(1);

  const navigate = useNavigate();
  return (
    <div className="flex">
      <Navbar />
      <div className="App  items-center  justify-between h-screen w-full space-y-4 ">
        <h1 className="text-xl m-3">{capitalize} DashBord</h1>
        <Dashbord />
        <Notification />
      </div>
    </div>
  );
};

export default Dashboard;
