import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Allproducts = () => {
  const [getdata, Setdata] = useState();

  useEffect(() => {
    const productApi = async () => {
      await axios
        .get("http://localhost:4000/products")
        .then((res) => {
          if (res.status === 200) {
            Setdata(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    productApi();
  }, []);

  const handledelete = async (id) => {
    console.log(id);

    await axios
      .delete(`http://localhost:4000/productsview/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("delete");
          Setdata((state) => {
            const filterData = state.filter((val) => val._id !== id);
            return filterData;
          });
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(getdata);

  return (
    <div>
      <h1>All products</h1>
      <div className="">
        <div className="w-1/7 flex justify-evenly border-2 border-gray-600 m-2 p-2">
          <div>ItemCode</div>
          <div>ItemName</div>
          <div>manufacturer</div>
          <div>Encode</div>
        </div>

        {getdata?.map((val) => (
          <div
            key={val._id}
            className="w-1/7 flex justify-evenly border-2 border-gray-600 m-2 p-2"
          >
            <p className="w-26 p-6 bg-red-200">{val.itemCode}</p>
            <p className="w-26 p-6 bg-red-200">{val.itemName}</p>
            <p className="w-26 p-6 bg-red-200">{val.manufacturer}</p>
            <p className="w-26 p-6 bg-red-200">{val.encode}</p>
            <div className="flex ">
              <span>
                <Link to={`/create/${val._id}`}>
                  <FaRegEdit />
                </Link>
              </span>
              <span>
                <RiDeleteBin6Line onClick={() => handledelete(val._id)} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Allproducts;
