const express = require("express");
const Notification = require("../models/notificationModel");

// Fetch unresolved notifications (those that haven't been resolved)
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ isResolved: false });
    res.status(200).json(notifications); // Send the unresolved notifications as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // Handle errors
  }
};

module.exports = { getNotifications };
