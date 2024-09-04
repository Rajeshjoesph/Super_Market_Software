import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CreateProduct from "../product/Newproduct";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initstate = {
    itemName: "",
    encode: "",
    manufacturer: "",
    gst: "",
  };
  const [formData, setFormData] = useState(initstate);

  useEffect(() => {
    if (id) {
      const getdata = async () => {
        await axios
          .get(`http://localhost:4000/productsview/${id}`)
          .then((res) => {
            setFormData(res.data.data);
            console.log(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getdata();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`http://localhost:4000/productsview/${id}`, formData)
        .then((res) => {
          console.log("Data Update successfully");
          toast.success(res.message);
          toast.success(`Product with ID ${id} updated successfully!`);
          navigate("/Allproduct");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:4000/products", formData)
        .then((res) => {
          if (res.status === 200) {
            // toast.success(res.data.message);
            setFormData(initstate);
            console.log(res.data.message);
            toast.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(formData);
    }
  };
  console.log(formData);
  return (
    <div className="w-1/2 mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        {id ? "Update Product" : "Register"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="itemName"
          >
            Product Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Product Name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="encode"
          >
            Product Encode
          </label>
          <input
            type="text"
            id="encode"
            name="encode"
            value={formData.encode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your  Product Encode"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="manufacturer"
          >
            Manufacturer
          </label>
          <input
            type="manufacturer"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Manufacturer"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="gst">
            Gst No
          </label>
          <input
            type="gst"
            id="gst"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your gst"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default CreateProduct;
