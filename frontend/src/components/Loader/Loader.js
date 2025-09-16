import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add preload hint for logo
    const linkEl = document.createElement('link');
    linkEl.rel = 'preload';
    linkEl.as = 'image';
    linkEl.href = '/images/Logo -Corcodusa.ro.png';
    document.head.appendChild(linkEl);

    // Start hiding loader after content is ready
    if (document.readyState === 'complete') {
      handleContentLoaded();
    } else {
      window.addEventListener('load', handleContentLoaded);
    }

    return () => {
      window.removeEventListener('load', handleContentLoaded);
      document.head.removeChild(linkEl);
    };
  }, []);

  const handleContentLoaded = () => {
    // Small delay to ensure smooth transition
    setTimeout(() => setIsLoading(false), 500);
  };

  if (!isLoading) return null;

  return (
    <div className={`loader-container ${!isLoading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <img 
          src="/images/Logo -Corcodusa.ro.png" 
          alt="Corcodusa Logo" 
          className="loader-logo"
          width="150"
          height="150"
          loading="eager"
          fetchpriority="high"
        />
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
};

export default Loader;