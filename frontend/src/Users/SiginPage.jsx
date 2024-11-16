import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeContext } from "../Context/StoreContext";
import { Player } from "lottie-react";
import loginAnimation from "../Pubilc/gifs/Tabletlogin.gif";
const { FRONTEND_URL } = process.env;

const SiginPage = () => {
  const initstate = {
    email: "",
    password: "",
  };
  const [sigin, setSigin] = useState(initstate);
  const { setUsers } = useContext(storeContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigin({ ...sigin, [name]: value });
  };
  console.log(sigin);

  const signOut = () => {
    localStorage.removeItem("user"); // Clear user data on sign-out
    setUsers([]); // Clear context state
  };
  // axios.defaults.withCredentials = true;
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const SiginApi = await axios.post("FRONTEND_URL/sigin", sigin);
      if (SiginApi.status === 200) {
        const userData = SiginApi.data.data;
        setUsers([userData]);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Sign in successful");
        setErrorMessage("");
        navigate("/dashbord");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse justify-around items-center ">
      <div className="h-screen w-2/5 flex-col justify-items-end py-6">
        <div className="h-[95%] w-full max-w-md flex items-center">
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {errorMessage}
            </div>
          )}

          <form
            className="w-5/6 flex flex-col text-start "
            onSubmit={handleSignIn}
          >
            <h2 className="text-2xl text-theme-red font-bold text-start mb-6">
              Sign In
            </h2>
            <div className="mb-6">
              {/* <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label> */}
              <input
                id="email"
                type="email"
                name="email"
                // value={sigin.email}
                onChange={(e) => handleChange(e)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 drop-shadow-lg"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              {/* <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label> */}
              <input
                id="password"
                type="password"
                name="password"
                // value={sigin.password}
                onChange={(e) => handleChange(e)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 drop-shadow-lg"
                placeholder="Enter your password "
                required
              />
            </div>

            <div className="flex flex-col-reverse w-40 items-start mt-8">
              <button
                type="submit"
                className="bg-theme-red w-full  hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4 drop-shadow-lg"
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

      <div className="flex justify-evenly">
        <img
          src={loginAnimation}
          alt="Login Animation"
          className="hidden md:block h-90 w-90"
        />
      </div>
    </div>
  );
};

export default SiginPage;
