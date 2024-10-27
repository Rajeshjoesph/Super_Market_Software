const express = require("express");
const Notification = require(`../Notification/module`);
const { notifyAdmins } = require("../sockets/notificationSocket");

const checkStockAndNotify = async (itemCode, currentStock, io) => {
  try {
    console.log("checkStockAndNotify");

    console.log("checkStockAndNotify", itemCode, currentStock);

    if (currentStock <= 50) {
      const notification = await Notification.create({
        itemCode,
        message: `Low stock for product ID: ${itemCode}. Current stock: ${currentStock}`,
        stockLevel: currentStock,
      });
      console.log(notification);

      notifyAdmins(notification);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateStockAndClearNotification = async (itemCode, newStock) => {
  if (newStock > 50) {
    await Notification.updateMany(
      { productId, isResolved: false },
      { isResolved: true }
    );
  }
};

module.exports = { checkStockAndNotify, updateStockAndClearNotification };
