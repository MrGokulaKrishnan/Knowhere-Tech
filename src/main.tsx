import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initDB } from '@/services/db';

// Initialize IndexedDB on startup
initDB().catch(console.warn);

// Register Service Worker for PWA / Open in App capability
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.log('ServiceWorker registration note:', err);
    });
  });
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
