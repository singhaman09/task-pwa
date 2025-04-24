# Push Notification Component (React + Tailwind)

This is a simple yet modern React component that allows users to enable browser notifications and send custom messages using the **Notification API** and **Service Workers**. It is designed as a Progressive Web App (PWA) and can be installed on mobile devices.

## Live Demo

```
 https://task-pwa.vercel.app/

```

## File structure

```
pwa-notifications/
├── public/
│   └── sw.js
├── src/
│   ├── components/
│   │   ├── Notification.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── PWABadge.css
│   ├── PWABudge.tsx
│   └── serviceWorkerRegistration.ts
|
├── index.html
├── vite.config.ts
├── README.md
├── tsconfig.json
├── vite.config.ts
└── package.json

```

## Features

- Request browser notification permissions.
- Send browser push notifications.
- PWA-ready: Works with Service Workers and can be installed on supported mobile devices.
- TailwindCSS styled interface with modern UI/UX.

---

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/singhaman09/task-pwa
   cd task-pwa

   ```

2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm run dev
```

## Short Report

### Steps to Configure manifest.json

1. Add manifest into your vite.config.ts file:

```
  manifest: {
        name: "pwa-notifications",
        short_name: "nothing",
        description: "pwa-notifications",
        theme_color: "#ffffff",
      }

```

### Steps to Register Service Worker

1. Put sw.js in your public/ folder

2. In src/index.js or src/main.jsx, register it

### Mobile Installation Steps (PWA)

1. Open the app URL in Chrome (on Android).

2. You’ll see a banner: “Add to Home screen”.

3. Tap on it to install the app like a regular mobile app.
