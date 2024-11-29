// Phone.js
import React from "react";

const Phones = ({ phone,Phone1 }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex flex-column">
          <p className="mb-0 fw-bold text-dark" style={{ fontSize: "12px" }}>
            Phone
          </p>
          <span className="text-muted d-block" style={{ fontSize: "10px" }}>
            <a href={`tel:${phone || "+977-021555224"}`} className="text-muted" style={{ textDecoration: "none" }}>
              {phone || "+977-021555224"}<br></br>
              {Phone1||"+977-021555834"}
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default Phones;