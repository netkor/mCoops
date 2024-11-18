// TopSectionBar.js
import React from 'react';

const TopSectionBar = ({ settings }) => {
  return (
    <div className="bg-success text-white py-2">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <span className="me-3" style={{ fontSize: "12px" }}>
              <i className="fas fa-envelope me-1"></i>
              {settings.email || ""}
            </span>
            <span style={{ fontSize: "12px" }}>
              <i className="fas fa-phone-alt me-1"></i>
              {settings.phone || ""}
            </span>
          </div>
          <div className="d-flex">
            <span className="me-3" style={{ fontSize: "12px" }}>
              <i className="fas fa-map-marker-alt me-1"></i>
              {settings.location || "Kathmandu, Nepal"}
            </span>
            <span style={{ fontSize: "12px" }}>
              <i className="fas fa-clock me-1"></i>
              {settings.opening_hours || "Mon-Fri: 9am - 5pm"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSectionBar;