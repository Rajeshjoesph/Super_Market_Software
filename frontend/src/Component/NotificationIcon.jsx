import React, { useEffect, useState } from "react";
import {
  initSocket,
  subscribeToNotifications,
} from "../services/socketService";

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    initSocket();

    // Subscribe to low-stock notifications
    subscribeToNotifications((newNotification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    });

    // Fetch initial unresolved notifications
    const fetchInitialNotifications = async () => {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      setNotifications(data);
    };

    fetchInitialNotifications();
  }, []);

  return (
    <div className="notification-icon">
      <span className="icon">🔔</span>
      {notifications.length > 0 && (
        <span className="badge">{notifications.length}</span>
      )}
    </div>
  );
};

export default NotificationIcon;
