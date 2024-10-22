const express = require("express");
const mongoose = require("mongoose");
const connection = require("./src/config/connection");
const router = require("./src/inventory/router");
const purchaserouter = require("./src/Purchase/router");
const cors = require("cors");
const salesRouter = require("./src/Sales/router");
const openStockRouter = require("./src/stock_inventroy/router");
const UsersRouter = require("./src/Users/router");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
  },
});
app.use((req, res, next) => {
  req.io = io; // Attach io to req object
  next();
});
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
  })
);
connection();
app.use(router);
app.use(purchaserouter);
app.use(salesRouter(io));
app.use(openStockRouter);
app.use(UsersRouter);

app.post("/send", (req, res) => {
  const message = req.body.message;
  console.log(message);
  index.js;
  io.emit("message", { message });
  res.status(200).send({
    message: "Message sent successfully",
  });

  io.on("connection", (socket) => {
    console.log("A client Connected");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    // Emit an event named "TestEvent"
    // setTimeout(() => {
    // const alert = {
    //   itemCode: "ABC123",
    //   stockLevel: 5,
    //   message: "Stock for ABC123 is low: 5 units left.",
    // };
    //   socket.emit("lowStockAlert", socket); // Emitting directly for testing
    // }, 3000);

    // socket.on("TestEvent", (data) => {
    //   console.log("Recived from Client:", data);
    // });
  });
});

server.listen(4000, () => {
  console.log("Server Running on 4000.");
});

module.exports = io;
