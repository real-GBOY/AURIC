import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { isAr } from './lib/i18n';

// Arabic pages: right to left, Arabic fonts (Alexandria for headlines, IBM Plex Sans Arabic for text).
if (isAr) {
  document.documentElement.lang = 'ar';
  document.documentElement.dir = 'rtl';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Alexandria:wght@500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap';
  document.head.appendChild(link);
  document.title = 'أوريك — شريكك الرقمي';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
