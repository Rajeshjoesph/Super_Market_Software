import React from "react";
// import Navbar from "./navnar";
import Button from "./button";
import Allproducts from "../product/Allproducts";
import CreateProduct from "../product/Newproduct";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navnar";
import Dashbord from "../Admin/AdminItem";
import Notification from "./Notification";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Navbar />
      <div className="App  items-center  justify-between h-screen w-full space-y-4 ">
        <h1 className="text-xl m-3">Admin DashBord</h1>
        <Dashbord />
        <Notification />
      </div>
    </div>
  );
};

export default Dashboard;
