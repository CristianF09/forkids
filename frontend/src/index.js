import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';

const __lintKeep = [App, RouterProvider, StrictMode];
void __lintKeep;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((reg) => reg.unregister());
    });
    if (window.caches && window.caches.keys) {
      window.caches.keys().then((keys) => {
        keys.forEach((key) => window.caches.delete(key));
      });
    }
  });
}

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
