import { useState, useEffect } from "react";
import NotificationComponent from "./components/NotificationComponent";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);

    if (outcome === "accepted") {
      setIsInstalled(true);
    }
  };

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

        {!isInstalled && deferredPrompt && (
          <div className="mt-6 text-center">
            <button
              onClick={handleInstallClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Install App
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
