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
      <div className="container py-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={settings.logo ? `${imageUrl}${settings.logo}` : "https://via.placeholder.com/100"}
            alt="Logo"
            style={{ height: "50px" }}
          />
          <h5 className="ms-3 text-success fw-bold mb-0">
            {settings.name_np || "मनकामना बचत तथा ऋण सहकारी संस्था लि."} <br />
            <span className="text-muted" style={{ fontSize: "14px" }}>
            {settings.name || "मनकामना बचत तथा ऋण सहकारी संस्था लि."}
            </span>
          </h5>
        </div>
        <div className="d-flex align-items-center gap-4">
          <div className="text-center">
            <i className="bi bi-geo-alt-fill text-primary fs-5"></i>
            <p className="mb-0" style={{ fontSize: "14px" }}>
              Location
            </p>
            <span className="text-muted" style={{ fontSize: "12px" }}>
              {settings.address}
            </span>
          </div>
          <div className="text-center">
            <i className="bi bi-telephone-fill text-danger fs-5"></i>
            <p className="mb-0" style={{ fontSize: "14px" }}>
              Phone
            </p>
            <span className="text-muted" style={{ fontSize: "12px" }}>
              {settings.phone}
            </span>
          </div>
          <div className="text-center">
            <i className="bi bi-clock-fill text-warning fs-5"></i>
            <p className="mb-0" style={{ fontSize: "14px" }}>
              Opening Hours
            </p>
            <span className="text-muted" style={{ fontSize: "12px" }}>
              Tuesday-Sunday: 9am - 4pm <br /> Monday: 9am - 12pm
            </span>
          </div>
        </div>
      </div>

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
                <Link className="nav-link" to="/features">Features</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pricing">Pricing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/introduction">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  More
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/action">Action</Link></li>
                  <li><Link className="dropdown-item" to="/another-action">Another action</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/something-else">Something else here</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;