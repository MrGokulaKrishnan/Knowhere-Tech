import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initDB } from '@/services/db';

// Initialize IndexedDB on startup
initDB().catch(console.warn);

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
