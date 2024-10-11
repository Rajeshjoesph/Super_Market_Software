import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SiginPage = () => {
  const initstate = {
    email: "",
    password: "",
  };
  const [sigin, setSigin] = useState(initstate);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigin({ ...sigin, [name]: value });
  };
  console.log(sigin);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const SiginApi = await axios.post("http://localhost:4000/sigin", sigin);
      if (SiginApi.status === 200) {
        console.log("Sign in successful");
        setErrorMessage("");
        navigate("/");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              // value={sigin.email}
              onChange={(e) => handleChange(e)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              // value={sigin.password}
              onChange={(e) => handleChange(e)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <a
              href="#"
              className="text-sm text-indigo-500 hover:text-indigo-600"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiginPage;
