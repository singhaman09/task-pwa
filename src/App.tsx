import { useState, useEffect } from 'react';
import NotificationComponent from './components/NotificationComponent';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Check if PWA is installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Handle install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
    });

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    // We no longer need the prompt
    setDeferredPrompt(null);
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">React PWA Demo</h1>
        
        <div className="flex items-center justify-center mb-4">
          <div className={`w-4 h-4 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <p>{isOnline ? 'Online' : 'Offline'}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            This is a Progressive Web App built with React, TypeScript, and Vite.
            It supports offline usage, push notifications, and can be installed on your device.
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