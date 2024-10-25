const express = require("express");
const Notification = require("../Notification/module");

const notifiyRouter = express.Router();

notifiyRouter
  .route("/Notification")
  .post(Notification.checkStockAndNotify)
  .get(Notification.getNotifications);

module.exports = notifiyRouter;
