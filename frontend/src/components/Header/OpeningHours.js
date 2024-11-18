// OpeningHours.js
import React from 'react';

const OpeningHours = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex flex-column ">
        <p className="mb-0 fw-bold text-dark" style={{ fontSize: "12px" }}>
        Opening Hours          </p>
          <span className="text-muted d-block" style={{ fontSize: "10px" }}>
            Tue-Sun: 9am - 4pm <br /> Mon: 9am - 12pm
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default OpeningHours;