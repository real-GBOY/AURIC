import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import './fonts.css';
import './index.css';
import { isAr } from './lib/i18n';

// Arabic pages: right to left (the Arabic fonts come from fonts.css and load on demand).
if (isAr) {
  document.documentElement.lang = 'ar';
  document.documentElement.dir = 'rtl';
}

// Cookieless visit counts (Vercel Web Analytics). Needs "Web Analytics" switched on in the Vercel project; until then it does nothing.
if (import.meta.env.PROD) import('@vercel/analytics').then(({ inject }) => inject());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
