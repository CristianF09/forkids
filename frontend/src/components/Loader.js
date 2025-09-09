import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ title = 'corcodusa.ro', subtitle = 'se încarcă...' }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ('connection' in navigator) {
      const effectiveType = navigator.connection.effectiveType;
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        console.log("Rețea lentă detectată. Poți arăta loader-ul mai devreme.");
        setIsLoading(true); // activate visual loader immediately
      }
    }

    const LOADING_THRESHOLD = 100; // 0.1 seconds
    let loaderTimeout;

    // 1. Show loader if it exceeds 0.1 seconds
    loaderTimeout = setTimeout(() => {
      setIsLoading(true); // activate visual loader
    }, LOADING_THRESHOLD);

    // 2. Function for initial API calls
    const fetchInitialData = async () => {
      try {
        // Example: critical API calls
        const [userRes, configRes] = await Promise.all([
          fetch('/api/health'),         // health check
          fetch('/api/config')        // app configurations
        ]);

        if (!userRes.ok || !configRes.ok) throw new Error("API error");

        // Save data (e.g., in context or state)
        // ...

      } catch (error) {
        console.error("Initial load failed:", error);
      } finally {
        // 3. Clear timeout and hide loader
        clearTimeout(loaderTimeout);
        setIsLoading(false);
      }
    };

    // Start loading
    fetchInitialData();

    // Cleanup on unmount
    return () => clearTimeout(loaderTimeout);
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
