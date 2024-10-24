import react, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

const Notification = () => {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    socket.on("lowStockAlert", (data) => {
      setNotification((prev) => [...prev, data]);
      console.log("Low stock alert received:", data);
      toast.info(data.message, {
        position: toast.TOP_RIGHT,
      });
    });
    return () => {
      socket.off("lowStockAlert");
    };
  }, []);

  return (
    <div>
      <h1>Stock Update Notifications</h1>
      {notification.map((notif, index) => (
        <h3 key={index}>
          Stock for {notif.itemCode} is low: {notif.stockLevel} units left.
        </h3>
      ))}

      <ToastContainer />
    </div>
  );
};

export default Notification;
