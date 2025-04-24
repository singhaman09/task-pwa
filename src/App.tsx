import { useState, useEffect } from "react";
import NotificationComponent from "./components/NotificationComponent";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-md mx-auto bg-gray-400 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-6">React PWA Demo</h1>
        <div className="flex items-center justify-center mb-4">
          <div
            className={`w-4 h-4 rounded-full mr-2 ${
              isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <p>{isOnline ? "Online" : "Offline"}</p>
        </div>
        <div className="mb-6">
          <p className="text-gray-700 mb-2 text-center font-bold">
            Progressive Web App{" "}
          </p>
        </div>

        <NotificationComponent />
      </div>
    </div>
  );
}

export default App;
