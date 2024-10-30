const express = require("express");
const mongoose = require("mongoose");
// const connection = require("./src/config/connection");
// const router = require("./src/inventory/router");
// const purchaserouter = require("./src/Purchase/router");
// const cors = require("cors");
// const salesRouter = require("./src/Sales/router");
// const openStockRouter = require("./src/stock_inventroy/router");
// const UsersRouter = require("./src/Users/router");
// const http = require("http");
// const { Server } = require("socket.io");
// // const notifiyRouter = require("./src/Notification/router");

const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
//   },
// });
// app.use((req, res, next) => {
//   req.io = io; // Attach io to req object
//   next();
// });
app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
//   })
// );
// connection();
app.get("/", (req, res) => {
  res.json("Hello");
});
// app.use(router);
// app.use(purchaserouter);
// app.use(salesRouter(io));
// app.use(openStockRouter);
// app.use(UsersRouter);
// // app.use(notifiyRouter);

app.listen(4000, () => {
  console.log("====================================");
  console.log("Server Running on 4000.");
  console.log("====================================");
});
