import react, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { storeContext } from "../Context/StoreContext";
import PurchaseChart from "./Graph";

const Dashbord = () => {
  const { getStock, value, noUsers } = useContext(storeContext);

  const [todaySale, setTodaySale] = useState([]);
  const [purchaseValue, setPurchaseValue] = useState([]);

  useEffect(() => {
    getStock();
  }, []);

  const totStock = Array.isArray(value)
    ? value.reduce((total, item) => {
        return total + parseFloat(item.stockLevel);
      }, 0)
    : 0;

  // user count
  const totUsers = noUsers.length;

  useEffect(() => {
    const totSaleApi = async () => {
      await axios
        .get(`http://localhost:4000/todaySales`)
        .then((res) => {
          setTodaySale(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    const purchaseValue = async () => {
      await axios
        .get(`http://localhost:4000/todayPurchase`)
        .then((res) => {
          setPurchaseValue(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    purchaseValue();
    totSaleApi();
  }, []);

  const todayPurchase = Array.isArray(purchaseValue)
    ? purchaseValue.reduce((total, item) => {
        return total + parseFloat(item.totAmt);
      }, 0)
    : 0;

  const currentDateSales = Array.isArray(todaySale)
    ? todaySale.reduce((total, item) => {
        return total + parseFloat(item.totalAmt);
      }, 0)
    : 0;

  return (
    <div>
      <div className="flex justify-center">
        <div className="Stock_Level w-56 h-32 border-solid border-4 borde-indigo-600 m-5 p-3 shadow-2xl">
          <h2 className="text-6xl m-2">{totStock}</h2>
          <h1>Current Stock</h1>
        </div>
        <div className="TodaySale w-56 h-32 border-solid border-4 borde-indigo-600 m-5 p-3 shadow-2xl">
          <h2 className="text-6xl m-2">
            {currentDateSales.length ? <>Loading..</> : currentDateSales}
          </h2>
          <h1>Today Sale</h1>
        </div>
        <div className="Purchase w-56 h-32 border-solid border-4 borde-indigo-600 m-5 p-3 shadow-2xl">
          <h2 className="text-6xl m-2">
            {todayPurchase.length ? <>Loading</> : todayPurchase}
          </h2>
          <h1>Today Purchase</h1>
        </div>
        <div className="Users w-56 h-32 border-solid border-4 borde-indigo-600 m-5 p-3 shadow-2xl">
          <h2 className="text-6xl m-2">{totUsers}</h2>
          <h1> Users</h1>
        </div>
      </div>
      <PurchaseChart />
    </div>
  );
};

export default Dashbord;
