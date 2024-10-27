let io;

const initSocket = (server) => {
  io = require("socket.io")(server);
  io.on("connect", (socket) => {
    console.log("User Connect:", socket.id);
    socket.on("disconnect", () => {
      console.log("User Disconnect:", socket.id);
    });
  });
};

const notifyAdmins = (notification) => {
  if (io) {
    io.emit("notification", notification);
  }
};

module.exports = { initSocket, notifyAdmins };
