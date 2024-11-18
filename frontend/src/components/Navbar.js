// Navbar.js
import React, { useState, useEffect } from "react";
import Logo from "./Header/Logo";
import NavItem from "./Header/NavItem";
import Dropdown from "./Header/Dropdown";
// import OpeningHours from './Header/OpeningHours';
import axios from "axios";
import OpeningHours from "./Header/OpeningHours";
import Phones from "./Header/Phone";
import Location from "./Header/Location";
import TopSection from "./Header/TopSection";
import TopSectionBar from "./Header/TopSectionBar";

const Navbar = () => {
  const [settings, setSettings] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const baseUrl = process.env.REACT_APP_API_URL;
  const imageUrl = process.env.REACT_APP_IMAGE_URL;
  const settingsUrl = `${baseUrl}/settings`;

  useEffect(() => {
    axios
      .get(settingsUrl)
      .then((response) => {
        if (response.data.length > 0) {
          setSettings(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the settings!", error);
      });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [settingsUrl]);

  const aboutItems = [
    { to: "/introduction", label: "Introduction" },
    { to: "/message-from-director", label: "Message from Directors" },
    { to: "/board-of-directors", label: "Board of Members" },
    { to: "/our-teams", label: "Our Team" },
    { to: "/our-financials", label: "Our Financials" },
    { to: "/barsik-pratibedan-2081/", label: "Annual Report" },
  ];

  const interestRateItems = [
    { to: "/saving-interest-rate", label: "Saving Interest Rate" },
    { to: "/loan-interest-rate", label: "Loan Interest Rate" },
  ];

  const productServicesItems = [
    { to: "/deposit", label: "Deposit" },
    { to: "/loan", label: "Loan" },
    { divider: true },
    { to: "/remittance", label: "Remittance" },
    { to: "/mobile-banking", label: "Mobile Banking" },
  ];

  return (
    <header className="border-bottom">
      {/* Top Section */}
      <div className="container">
        <div className="d-none d-lg-flex">
          <TopSectionBar settings={settings} />
        </div>
        <div className="d-flex justify-content-between ">
          {/* Logo and Organization Name */}
          <TopSection
            settings={settings}
            logo={settings.logo}
            imageUrl={imageUrl}
          />

          {/* Contact Info */}
          <div className="d-none d-lg-flex align-items-center">
            {/* Location */}
            <Location location={settings.location} />

            {/* Phone */}
            <Phones location={settings.phone} />

            {/* Opening Hours */}
            <OpeningHours hours={settings.opening_hours} />
          </div>
        </div>
      </div>
      {/* Navbar Section */}
      <div className="container">
        <nav
          className={`navbar navbar-expand-lg navbar-dark bg-success py-1  ${
            scrolled ? "fixed-top opacity-20" : ""
          }`}
        >
          <div className="container">
            {scrolled && <Logo logo={settings.logo} imageUrl={imageUrl} />}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <NavItem to="/">Home</NavItem>
                <NavItem to="/branches">Branch</NavItem>
                <NavItem to="/download">Download</NavItem>
                <Dropdown title="About" items={aboutItems} />
                <NavItem to="/contact">Contact</NavItem>
                <NavItem to="/gallery">Gallery</NavItem>
                <NavItem to="/notice">Notice</NavItem>
                <Dropdown title="Interest Rate" items={interestRateItems} />
                <Dropdown
                  title="Product & Services"
                  items={productServicesItems}
                />
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
