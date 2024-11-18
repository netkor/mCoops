// TopSection.js
import React from "react";

const TopSection = ({ settings, logo, imageUrl }) => {
  const logoUrl = `${imageUrl}${logo}`;
  console.log('Logo URL:', logoUrl); // Debug

  return (
    <div className="d-flex align-items-center">
      <img
        src={settings.logo ? `${imageUrl}${settings.logo}` : "https://via.placeholder.com/100"}
        alt="Logo"
        className="rounded-circle border"
        style={{ height: "40px", width: "40px", objectFit: "cover" }}
      />
      <div className="ms-2">
        <h6 className="text-success fw-bold mb-0" style={{ fontSize: "18px" }}>
          {settings.name_np || "मनकामना बचत तथा ऋण सहकारी संस्था लि."}
        </h6>
        <span className="text-muted d-block" style={{ fontSize: "14px" }}>
          {settings.name || "Manakamana Cooperative Ltd."}
        </span>
      </div>
    </div>
  );
};

export default TopSection;