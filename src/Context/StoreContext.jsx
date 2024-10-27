import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const storeContext = createContext();

const StorecontextProvider = ({ children }) => {
  const storeUser = useMemo(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }, []);
  const [value, setValue] = useState([]);
  const [noUsers, setNoUsers] = useState([]);
  const [users, setUsers] = useState(storeUser ? [storeUser] : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (users[0]) {
      localStorage.setItem("user", JSON.stringify(users[0]));
    }
  }, [users]);

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

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        await axios.get("http://localhost:4000/users").then((res) => {
          // console.log(res.data.data);
          if (res.status === 200) {
            setNoUsers(res.data.data);
          }
          // console.log("object=>", Object.keys(res.data.data));
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const shareContext = useMemo(
    () => ({
      value,
      getStock,
      noUsers,
      setNoUsers,
      loading,
      error,
      users,
      setUsers,
    }),
    [value, noUsers, loading, error, users]
  );

  // console.log("Providing context values:", shareContext);

  return (
    <storeContext.Provider value={shareContext}>
      {children}
    </storeContext.Provider>
  );
};

export default StorecontextProvider;
