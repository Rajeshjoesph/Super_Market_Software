import { createContext, useState } from "react";
import axios from "axios";

export const storeContext = createContext();

const StorecontextProvider = ({ children }) => {
  const [value, setValue] = useState([]);

  const getStock = async () => {
    try {
      const res = await axios.get("http://localhost:4000/openstock");

      if (res.status === 200) {
        setValue(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const shareContext = {
    value,
    getStock,
  };

  // console.log("Providing context values:", shareContext);

  return (
    <storeContext.Provider value={shareContext}>
      {children}
    </storeContext.Provider>
  );
};

export default StorecontextProvider;
