import io from "socket.io-client";

let socket;

export const initSocket = () => {
  socket = io("http://localhost:4000");
};

export const subscribeToNotifications = (callback) => {
  if (!socket) return;

  socket.on("lowStockNotification", (notification) => {
    callback(notification);
  });
};
