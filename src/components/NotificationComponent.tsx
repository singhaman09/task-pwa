import { useState } from "react";

const NotificationComponent = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [message, setMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        setNotificationStatus(
          "Permission granted! You can now receive notifications."
        );
      } else {
        setNotificationStatus("Permission denied for notifications.");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      setNotificationStatus("Error requesting permission.");
    }
  };

  const sendNotification = () => {
    if (permission !== "granted") {
      setNotificationStatus("You need to grant permission first.");
      return;
    }

    if (!message) {
      setNotificationStatus("Please enter a message.");
      return;
    }

    try {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker.ready
          .then((registration) => {
            registration.showNotification("PWA Notification", {
              body: message,
              icon: "/icon-192x192.png",
              badge: "/icon-192x192.png",
            });
            setNotificationStatus("Notification sent!");
            setMessage("");
          })
          .catch((err) => {
            throw err;
          });
      } else {
        new Notification("PWA Notification", {
          body: message,
          icon: "/icon-192x192.png",
        });
        setNotificationStatus("Notification sent!");
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setNotificationStatus("Error sending notification.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10  border border-gray-200 shadow-2xl rounded-3xl p-6 transition-all duration-300 hover:shadow-blue-200 bg-gray-300">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Push Notifier
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {permission !== "granted" && (
          <button
            onClick={requestPermission}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 px-4 rounded-full font-medium text-sm shadow-md transition"
          >
            Request Notification Permission
          </button>
        )}

        {permission === "granted" && (
          <div className="space-y-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your notification message!"
              className="w-full px-4 py-2 rounded-full bg-gray-100 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <button
              onClick={sendNotification}
              className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 px-4 rounded-full font-semibold text-sm shadow-md transition"
            >
              Send Notification
            </button>
          </div>
        )}

        {notificationStatus && (
          <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg px-4 py-2 text-sm text-center">
            {notificationStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationComponent;
