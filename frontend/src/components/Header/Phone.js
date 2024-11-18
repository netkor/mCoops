// OpeningHours.js
import React from "react";

const Phones = (settings) => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex flex-column align-items-center">
          <p className="mb-0 fw-bold text-dark" style={{ fontSize: "12px" }}>
            Phone
          </p>
          <span className="text-muted d-block" style={{ fontSize: "10px" }}>
            {settings.phone || "+977-1234567890"}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default Phones;
