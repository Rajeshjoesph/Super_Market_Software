import axios from "axios";
import React, { useEffect, useState } from "react";

const OpenstockDetail = () => {
  const [openstock, setopenStock] = useState();

  useEffect(() => {
    const stockApi = async () => {
      await axios
        .get("http://localhost:4000/openstock")
        .then((res) => {
          if (res.status === 200) {
            setopenStock(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    stockApi();
  }, []);

  console.log(openstock);

  return (
    <div>
      <h1>Open stock </h1>
      {openstock?.map((item) => (
        <>
          <p>{item.itemCode}</p>
          <p>{item.itemName}</p>
        </>
      ))}
    </div>
  );
};

export default OpenstockDetail;
