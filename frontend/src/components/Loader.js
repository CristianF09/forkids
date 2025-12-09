import { useEffect, useState } from 'react';
import './Loader.css';
import { API_ENDPOINTS } from '../config/api';

const Loader = ({ title = 'corcodusa.ro', subtitle = 'se încarcă...' }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ('connection' in navigator) {
      const effectiveType = navigator.connection.effectiveType;
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        setIsLoading(true);
      }
    }

    const LOADING_THRESHOLD = 100;
    const loaderTimeout = window.setTimeout(() => {
      setIsLoading(true);
    }, LOADING_THRESHOLD);

    // 2. Function for initial API calls
    const fetchInitialData = async () => {
      try {
        const isLocalDev = ['localhost', '127.0.0.1'].includes(window.location.hostname);
        if (isLocalDev) {
          return;
        }
        const healthRes = await window.fetch(API_ENDPOINTS.HEALTH, { cache: 'no-store' });
        if (!healthRes.ok) throw new Error('API error');

        // Save data (e.g., in context or state)
        // ...

      } catch (error) {
      } finally {
        window.clearTimeout(loaderTimeout);
        setIsLoading(false);
      }
    };

    fetchInitialData();
    return () => window.clearTimeout(loaderTimeout);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loader-overlay">
          <div className="loader-container">
            <div className="loader-content">
              <img
                src="/images/Logo -Corcodusa.ro.png"
                alt="Corcodușa Logo"
                className="loader-logo"
              />
              <div className="loader-text">
                <h2 className="loader-title">{title}</h2>
                <p className="loader-subtitle">{subtitle}</p>
              </div>
              <div className="loader-orbit"></div>
            </div>
          </div>
          <p>Se încarcă aplicația...</p>
        </div>
      ) : (
        <div>Content goes here</div>
      )}
    </div>
  );
};

export default Loader;
