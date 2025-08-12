import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <img 
          src="/images/Logo -Corcodusa.ro.png" 
          alt="Corcodușa Logo" 
          className="loader-logo" 
        />
        <div className="loader-text">
          <h2 className="loader-title">corcodusa.ro</h2>
          <p className="loader-subtitle">se încarcă...</p>
        </div>
        <div className="loader-spinner"></div>
        <div className="loader-progress">
          <div className="loader-progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader; 