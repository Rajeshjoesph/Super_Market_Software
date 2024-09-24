const express = require("express");
const mongoose = require("mongoose");
const connection = require("./src/config/connection");
const router = require("./src/inventory/router");
const purchaserouter = require("./src/Purchase/router");
const cors = require("cors");
const salesRouter = require("./src/Sales/router");
const openStockRouter = require("./src/stock_inventroy/router");
const app = express();
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
app.use(salesRouter);
app.use(openStockRouter);
app.listen(4000, () => {
  console.log("Server Running on 4000.");
});
