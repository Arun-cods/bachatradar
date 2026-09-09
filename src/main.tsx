import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register Progressive Web App (PWA) Service Worker for mobile devices
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('BachatRadar PWA Service Worker registered:', registration.scope);
      },
      (err) => {
        console.warn('PWA Service Worker registration failed:', err);
      }
    );
  });
}
