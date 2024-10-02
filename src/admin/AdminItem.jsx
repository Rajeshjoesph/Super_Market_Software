import axios from "axios";
import react, { useEffect, useState } from "react";

const Dashbord = () => {
  const [stock, getStock] = useState();
  useEffect(() => {
    const getStock = async () => {
      const response = await axios.get("http://localhost:4000/stock");
      if (response === 200) {
        getStock(response.data);
      }
    };
  });

  return (
    <div className="w-96 border-solid border-4 border-indigo-600 shadow-2xl">
      <h1>Dashboard</h1>
      <h2>element</h2>
    </div>
  );
};

export default Dashbord;
