import React from 'react';
import './Loader.css'; // pentru stilizare separată

const Loader = () => {
  return (
    <div className="loader-container">
      <img src="/Logo-Corcodusa.svg" alt="Corcodușa Logo" className="loader-logo" />
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader; 