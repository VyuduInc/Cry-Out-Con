import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initBarba } from './transitions/barba';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Initialize Barba after React has mounted
window.addEventListener('load', () => {
  initBarba();
});