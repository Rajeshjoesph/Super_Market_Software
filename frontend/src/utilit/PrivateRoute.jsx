import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { storeContext, ussUser } from "../Context/StoreContext";

const PrivateRouter = ({ element, roles }) => {
  const { users } = useContext(storeContext);
  const user = users[0];

  if (!user.role) {
    return <Navigate to="/Sigin" />;
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default PrivateRouter;
