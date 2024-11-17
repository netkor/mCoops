import React from "react";
import imeLogo from "../../remittances/ime.png";
import himalRemitLogo from "../../remittances/new himalremit.png";
import prabhuLogo from "../../remittances/prabhu.png";
import cityExpressLogo from "../../remittances/city expre.png";
import prithiviLogo from "../../remittances/Prithvi-Ramittance-300x150.jpg";
import samsaraLogo from "../../remittances/samsara.png";
import moneygramLogo from "../../remittances/newmoneygram.png";
import westernUnionLogo from "../../remittances/westren_union.jpg";

const Remittance = () => {
  const remittanceLogos = [
    { src: imeLogo, alt: "IME", title: "IME" },
    { src: himalRemitLogo, alt: "Himal Remit", title: "Himal Remit" },
    { src: prabhuLogo, alt: "Prabhu Money Transfer", title: "Prabhu Money Transfer" },
    { src: cityExpressLogo, alt: "City Express", title: "City Express" },
    { src: prithiviLogo, alt: "Prithivi Remit", title: "Prithivi Remit" },
    { src: samsaraLogo, alt: "Samsara Remit", title: "Samsara Remit" },
    { src: moneygramLogo, alt: "MoneyGram", title: "MoneyGram" },
    { src: westernUnionLogo, alt: "Western Union", title: "Western Union" },
  ];

  return (
    <div className="container my-4">
      {/* Header Section */}
      <div className="text-center mb-4">
        <h3 className="text-primary fw-bold">रेमिट्यान्स</h3>
        <p className="text-muted">
          संस्थामा सञ्चालित रेमिट्यान्स सेवाहरू
        </p>
      </div>

      {/* Logos Grid */}
      <div className="row g-4">
        {remittanceLogos.map((logo, index) => (
          <div className="col-6 col-md-3 text-center" key={index}>
            <div className="p-3 border rounded shadow-sm">
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                className="img-fluid"
                style={{ width: "150px", height: "100px", objectFit: "contain" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Remittance;