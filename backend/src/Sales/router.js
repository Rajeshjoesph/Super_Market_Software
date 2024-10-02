const express = require("express");
const salesControllor = require("./controllor");

const salesRouter = express.Router();

salesRouter
  .route("/sales")
  .post(salesControllor.saleBill)
  .get(salesControllor.viewBills);

salesRouter
  .route("/sales/:id")
  .get(salesControllor.findBill)
  .delete(salesControllor.deleteBill);

module.exports = salesRouter;
