const express = require("express");
const openStockControllor = require("../stock_inventroy/controllor");
const openStockRouter = express.Router();

openStockRouter
  .route("/openstock")
  .post(openStockControllor.openingStock)
  .get(openStockControllor.getStockDetail);

module.exports = openStockRouter;
