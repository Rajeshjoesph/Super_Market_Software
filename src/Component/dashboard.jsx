import React from "react";
// import Navbar from "./navnar";
import Button from "./button";
import Allproducts from "../product/Allproducts";
import CreateProduct from "../product/Newproduct";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navnar";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Navbar />
      <div className="App  items-center  justify-between h-screen w-full space-y-4 ">
        <h1>Admin DashBord</h1>
      </div>
    </div>
  );
};

export default Dashboard;
