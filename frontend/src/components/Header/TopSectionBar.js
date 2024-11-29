// TopSectionBar.js
import React from 'react';

const TopSectionBar = ({ settings }) => {
  return (
    <div className="py-2 text-white bg-danger" style={{ objectFit: "fill", borderRadius: "50px 0 50px 0" }}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <span className="me-3" style={{ fontSize: "12px" }}>
              <a href={`mailto:${settings.email || ""}`} className="text-white" style={{ textDecoration: "none" }}>
                <i className="fas fa-envelope me-1"></i>
                {settings.email|| ""}
              </a>
            </span>
            <span style={{ fontSize: "12px" }}>
              <a href={`tel:${settings.phone || ""}`} className="text-white" style={{ textDecoration: "none" }}>
                <i className="fas fa-phone-alt me-1"></i>
              | {settings.phone || ""}
              </a>
            </span>
          </div>
          <div className="d-flex">
            <span className="me-3" style={{ fontSize: "12px" }}>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.name || "Kathmandu, NepalManakamana Saving & Credit Co-operative Society Limited")}`} target="_blank" rel="noopener noreferrer" className="text-white" style={{ textDecoration: "none" }}>
                <i className="fas fa-map-marker-alt me-1"></i>
                | {settings.address || "Pathari Sanischare-1, Morang, Nepal"}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSectionBar;