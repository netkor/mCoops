import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure this import is included

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

function Navbar() {
  const [settings, setSettings] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const settingsUrl = `${baseUrl}/settings`;

  useEffect(() => {
    axios.get(settingsUrl)
      .then(response => {
        if (response.data.length > 0) {
          setSettings(response.data[0]);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the settings!", error);
      });
      const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [settingsUrl]);

  return (
    <header className="bg-white border-bottom">
      {/* Top Section */}
      <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        {/* Logo and Organization Name */}
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

        {/* Contact Info */}
        <div className="d-flex align-items-center gap-3">
          {/* Location */}
          <div className="text-center">
            <div className="p-1 bg-light rounded-circle shadow-sm d-inline-block">
              <i className="bi bi-geo-alt-fill text-primary fs-5"></i>
            </div>
            <p className="mb-0 fw-bold text-dark" style={{ fontSize: "12px" }}>
              Location
            </p>
            <span className="text-muted d-block" style={{ fontSize: "10px" }}>
              {settings.address || "Damak, Jhapa, Nepal"}
            </span>
          </div>

          {/* Phone */}
          <div className="text-center">
            <div className="p-1 bg-light rounded-circle shadow-sm d-inline-block">
              <i className="bi bi-telephone-fill text-danger fs-5"></i>
            </div>
            <p className="mb-0 fw-bold text-dark" style={{ fontSize: "12px" }}>
              Phone
            </p>
            <span className="text-muted d-block" style={{ fontSize: "10px" }}>
              {settings.phone || "+977-1234567890"}
            </span>
          </div>

          {/* Opening Hours */}
          <div className="text-center">
            <div className="p-1 bg-light rounded-circle shadow-sm d-inline-block">
              <i className="bi bi-clock-fill text-warning fs-5"></i>
            </div>
            <p className="mb-0 fw-bold text-dark" style={{ fontSize: "12px" }}>
              Opening Hours
            </p>
            <span className="text-muted d-block" style={{ fontSize: "10px" }}>
              Tue-Sun: 9am - 4pm <br /> Mon: 9am - 12pm
            </span>
          </div>
        </div>
      </div>
    </div>
<hr></hr>
      {/* Navbar Section */}
      <nav className={`navbar navbar-expand-lg navbar-light bg-light ${scrolled ? 'fixed-top opacity-50' : ''}`}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            {settings.logo ? <img src={`${imageUrl}${settings.logo}`} alt="Logo" width="30" height="30" className="d-inline-block align-text-top" /> : "Navbar"}
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/branches">Branch</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/download">Download</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  About
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/introduction">Introduction</Link></li>
                  <li><Link className="dropdown-item" to="/message-from-director">Message from Directors</Link></li>
                  <li><Link className="dropdown-item" to="/board-of-directors">Board of Members</Link></li>
                  <li><Link className="dropdown-item" to="/our-teams">Our Team</Link></li>
                  <li><Link className="dropdown-item" to="/our-financials">Our Financials</Link></li>
                  <li><Link className="dropdown-item" to="/barsik-pratibedan-2081/">Annual Report</Link></li>
                </ul>
              </li>
      
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallery">Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/notice">Notice</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Interest Rate
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/saving-interest-rate">Saving Interest Rate</Link></li>
                  <li><Link className="dropdown-item" to="/loan-interest-rate">Loan Interest Rate</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Product & Services
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/deposit">Deposit</Link></li>
                  <li><Link className="dropdown-item" to="/loan">Loan</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/remittance">Remittance</Link></li>
                  <li><Link className="dropdown-item" to="/mobile-banking">Mobile Banking</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr></hr>
    </header>
  );
}

export default Navbar;