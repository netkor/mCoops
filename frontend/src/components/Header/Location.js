// Location.js
import React from 'react';

const Location = ({ location }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex flex-column">
          <p className="mb-0 fw-bold text-dark" style={{ fontSize: "12px" }}>
            Location
          </p>
          <span className="text-muted d-block" style={{ fontSize: "10px" }}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location || "Kathmandu, Nepal")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted"
              style={{ textDecoration: "none" }}
            >
              {location || "Pathari Shanishchare-1,Morang, Nepal"}
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default Location;