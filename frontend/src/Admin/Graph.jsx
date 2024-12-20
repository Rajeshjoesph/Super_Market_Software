import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import axios from "axios";

const PurchaseChart = () => {
  const [view, setView] = useState("daily"); // Default view
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get("http://localhost:4000/purchaseentry");
        if (res.status === 200) {
          setData(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);

  const dailyData = () => {
    return data.map((e) => ({
      date: e.entrydate, // Adjust according to your actual data structure
      amount: e.totAmt, // Adjust according to your actual data structure
    }));
  };

  const monthlyData = 0;

  const yearlyData = 0;

  const getData = () => {
    switch (view) {
      case "daily":
        return dailyData();
      case "monthly":
        return monthlyData;
      case "yearly":
        return yearlyData;
      default:
        return dailyData;
    }
  };

  const config = {
    data: dailyData(),
    xField: view === "daily" ? "date" : view === "monthly" ? "month" : "year",
    yField: "amount",
    title: `Purchase Amount (${view.charAt(0).toUpperCase() + view.slice(1)})`,
    point: {
      shape: "circle",
    },
    line: {
      size: 2,
    },
  };

  return (
    <div>
      <h1>Sales Amount Over Time</h1>
      <div>
        <button onClick={() => setView("daily")}>Daily</button>
        <button onClick={() => setView("monthly")}>Monthly</button>
        <button onClick={() => setView("yearly")}>Yearly</button>
      </div>
      <Line {...config} />
    </div>
  );
};

export default PurchaseChart;
