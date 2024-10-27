import "./App.css";

import Navbar from "./Component/navnar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Component/dashboard";
import Allproducts from "./product/Allproducts";
import CreateProduct from "./product/Newproduct";
import PurchaseEntry from "./Purchase/PurchaseEntry";
import PurchaseHistory from "./Purchase/PurchaseHistory";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import OpenstockDetail from "./OpenStock/OpenStock";
import Sale from "./Sale/Sale";
import ViewBils from "./Sale/ViewBills";
import UserSigup from "./Users/CreateUsers";
import DisplayUsers from "./Users/UserDetail";
import SiginPage from "./Users/SiginPage";
import { useState } from "react";
import PaymentModal from "./Component/table";
import Notification from "./Component/Notification";
import Unauthorized from "./Component/Unauthorized";
import PrivateRouter from "./utilit/PrivateRoute";

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route index path="/" element={<SiginPage />} />
        <Route path="/dashbord" element={<Dashboard />} />
        <Route
          path="/create"
          element={
            <PrivateRouter
              element={<CreateProduct />}
              allowedRoles={["admin", "inventoryManager"]}
            />
          }
        />
        <Route
          path="/create/:id"
          element={
            <PrivateRouter
              element={<CreateProduct />}
              allowedRoles={["admin", "inventoryManager"]}
            />
          }
        />
        <Route
          path="/Allproduct"
          element={
            <PrivateRouter
              element={<Allproducts />}
              allowedRoles={["admin", "inventoryManager", "Grn", "Salesman"]}
            />
          }
        />
        <Route
          path="/PurchaseEntry"
          element={
            <PrivateRouter
              element={<PurchaseEntry />}
              allowedRoles={["admin", "inventoryManager"]}
            />
          }
        />
        <Route
          path="/PurchaseHistory"
          element={
            <PrivateRouter
              element={<PurchaseHistory />}
              allowedRoles={["admin", "inventoryManager"]}
            />
          }
        />
        <Route
          path="/PurchaseEntry/:id"
          element={
            <PrivateRouter
              element={<PurchaseEntry />}
              allowedRoles={["admin", "inventoryManager"]}
            />
          }
        />
        <Route
          path="/OpeningStockView"
          element={
            <PrivateRouter
              element={<OpenstockDetail />}
              allowedRoles={["admin", "inventoryManager"]}
            />
          }
        />
        <Route
          path="/Sale"
          element={
            <PrivateRouter
              element={<Sale />}
              allowedRoles={["admin", "inventoryManager", "salesman"]}
            />
          }
        />
        <Route
          path="/ViewBill"
          element={
            <PrivateRouter
              element={<ViewBils />}
              allowedRoles={["admin", "inventoryManager", "salesman"]}
            />
          }
        />
        <Route
          path="/sales/:id"
          element={
            <PrivateRouter
              element={<Sale />}
              allowedRoles={["admin", "inventoryManager"]}
            />
          }
        />
        <Route
          path="/SigUp"
          element={
            <PrivateRouter
              element={<UserSigup />}
              allowedRoles={["admin", "inventoryManager"]}
            />
          }
        />
        <Route
          path="/AllUsers"
          element={
            <PrivateRouter
              element={<DisplayUsers />}
              allowedRoles={["admin", "inventoryManager"]}
            />
          }
        />
        <Route
          path="/users/:id"
          element={
            <PrivateRouter
              element={<UserSigup />}
              allowedRoles={["admin", "inventoryManager"]}
            />
          }
        />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>

      {/* <div className="h-screen flex items-center justify-center">
        <button
          
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Open Payment Screen
        </button>

       
      </div> */}
    </div>
  );
}

export default App;
