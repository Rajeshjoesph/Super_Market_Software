import React, { useEffect, useState } from "react";
import { subscribeToNotifications } from "../services/socketService";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Subscribe to real-time notifications
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
    <div className="notification-list">
      {notifications.map((notif) => (
        <div key={notif._id} className="notification-item">
          <p>{notif.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
