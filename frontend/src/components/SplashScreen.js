import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SplashScreen = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <img src="logo.png" alt="Logo" className="img-fluid mb-4" style={{ width: '100px', height: '100px' }} />
        <h1 className="h4 mb-3">Manakamana Saving & Credit Co-operative Society Limited</h1>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;