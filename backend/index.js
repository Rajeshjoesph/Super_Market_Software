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
const { RUNNING_URL, PORT_URL } = process.env;
// const notifiyRouter = require("./src/Notification/router");

const app = express();
const port = PORT_URL || 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: RUNNING_URL,
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
    origin: RUNNING_URL,
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
  })
);
connection();
app.use(router);
app.use(purchaserouter);
app.use(salesRouter(io));
app.use(openStockRouter);
app.use(UsersRouter);
// app.use(notifiyRouter);

server.listen(port, () => {
  console.log("====================================");
  console.log("Server Running on 4000.");
  console.log("====================================");
});
