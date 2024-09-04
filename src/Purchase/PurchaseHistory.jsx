import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import axios from "axios";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";

const PurchaseHistory = () => {
  const [veiwDetail, setViewDetail] = useState();
  useEffect(() => {
    const recivedata = async () => {
      axios
        .get("http://localhost:4000/purchaseentry")
        .then((res) => {
          if (res.status === 200) {
            setViewDetail(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    recivedata();
  }, []);

  return (
    <div className="p-2">
      <h1>Purchase History</h1>
      <div className="w-full bg-gray-400 flex justify-between rounded-t-lg ">
        <p className="w-56 bg-red-400">Purchase Date</p>
        <p className="w-50 bg-red-400">supplyerName</p>
        <p className="w-50 bg-red-400">invoiceNo</p>
        <p className="w-50 bg-red-400">Bill Amount</p>
        <p className="w-50 bg-red-400">Grn No</p>
        <p className="w-50 bg-red-400">Edit</p>
        <p className="w-50 bg-red-400">Menu</p>
        {/* <h1>{e.enrtyDate}</h1> */}
      </div>
      {veiwDetail?.map((e) => (
        <div className="w-full h-b bg-gray-400 my-4 px-5 flex justify-between rounded-md">
          {/* <h1>hello</h1> */}
          <h1>{e.enrtyDate}</h1>
          <h1>{e.supplyerName}</h1>
          <h1>{e.invoiceNo}</h1>
          <h1>{e.billAmt}</h1>
          <h1>{e._id}</h1>
          <h1>
            <Link to={`/purchaseentry/${e._id}`}>
              <RiEdit2Fill />
            </Link>
          </h1>
          <h1>
            <CiMenuKebab />
          </h1>
        </div>
      ))}
    </div>
  );
};
export default PurchaseHistory;
