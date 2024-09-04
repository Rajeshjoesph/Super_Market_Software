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

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/create/:id" element={<CreateProduct />} />
        <Route path="/Allproduct" element={<Allproducts />} />
        <Route path="/PurchaseEntry" element={<PurchaseEntry />} />
        <Route path="/PurchaseHistory" element={<PurchaseHistory />} />
        <Route path="/PurchaseEntry/:id" element={<PurchaseEntry />} />
      </Routes>
    </div>
  );
}

export default App;
