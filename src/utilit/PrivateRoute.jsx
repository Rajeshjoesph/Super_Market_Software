import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { storeContext, ussUser } from "../Context/StoreContext";

const PrivateRouter = ({ children, roles }) => {
  const { users } = useContext(storeContext);
  const user = users[0];

  if (!user) {
    return <Navigate to="/Sigin" />;
  }
  if (roles && !roles.include(user.roles)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRouter;
