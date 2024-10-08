const express = require("express");
const inboundControllor = require("../Purchase/controllor");
const { get } = require("mongoose");

const purchaserouter = express.Router();

purchaserouter
  .route("/purchaseentry")
  .post(inboundControllor.inboundEntry)
  .get(inboundControllor.inboundDetails);

purchaserouter
  .route("/purchaseentry/:id")
  .get(inboundControllor.inboundBillDatil)
  .put(inboundControllor.inboundBillEdit)
  .delete(inboundControllor.inboundBillDelete);
module.exports = purchaserouter;
