const express = require("express");
const mongoose = require("mongoose");
const connection = require("./src/config/connection");
const router = require("./src/inventory/router");
const purchaserouter = require("./src/Purchase/router");
const cors = require("cors");
const salesRouter = require("./src/Sales/router");
const openStockRouter = require("./src/stock_inventroy/router");
const UsersRouter = require("./src/Users/router");
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
const allowedOrigins = [
  "http://localhost:3000",
  "https://super-market-software-frontend.vercel.app",
];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "https://super-market-software-frontend.vercel.app", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add any other headers you need
    credentials: true, // If you need to include cookies
  })
);
connection();
app.get("/", (req, res) => {
  res.json("Hello");
});
app.use(router);
app.use(purchaserouter);
app.use(salesRouter);
app.use(openStockRouter);
app.use(UsersRouter);
// // app.use(notifiyRouter);

app.listen(4000, () => {
  console.log("====================================");
  console.log("Server Running on 4000.");
  console.log("====================================");
});
