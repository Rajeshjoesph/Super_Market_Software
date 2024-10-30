const express = require("express");
const salesControllor = require("./controllor");

const salesRouter = express.Router();
module.exports = () => {
  salesRouter
    .route("/sales")
    .post(salesControllor.saleBill)
    .get(salesControllor.viewBills);

  salesRouter
    .route("/sales/:id")
    .get(salesControllor.findBill)
    .put(salesControllor.UpdateSalebill)
    .delete(salesControllor.deleteBill);

  salesRouter.route("/todaySales").get(salesControllor.currentDateSales);

  return salesRouter;
};
