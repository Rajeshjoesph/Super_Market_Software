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
        <Link to={"/create"}>
          <Button
            label="Create Product"
            styleType="primary"
            className="gap-20"
          />
        </Link>
        <Link to={"/Allproduct"}>
          <Button label="View Product" styleType="secondary" />
        </Link>
        <Link to={"/PurchaseEntry"}>
          <Button label="Prurchase Entry" styleType="secondary" />
        </Link>
        <Link to={"/PurchaseHistory"}>
          <Button label="Prurchase History" styleType="secondary" />
        </Link>
      </div>

      {/* */}
    </div>
  );
};

export default Dashboard;
