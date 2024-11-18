// Navbar.js
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import NavItem from './NavItem';
import Dropdown from './Dropdown';
import OpeningHours from './OpeningHours';

const Navbar = ({ settings, imageUrl }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const aboutItems = [
    { to: '/introduction', label: 'Introduction' },
    { to: '/message-from-director', label: 'Message from Directors' },
    { to: '/board-of-directors', label: 'Board of Members' },
    { to: '/our-teams', label: 'Our Team' },
    { to: '/our-financials', label: 'Our Financials' },
    { to: '/barsik-pratibedan-2081/', label: 'Annual Report' },
  ];

  const interestRateItems = [
    { to: '/saving-interest-rate', label: 'Saving Interest Rate' },
    { to: '/loan-interest-rate', label: 'Loan Interest Rate' },
  ];

  const productServicesItems = [
    { to: '/deposit', label: 'Deposit' },
    { to: '/loan', label: 'Loan' },
    { divider: true },
    { to: '/remittance', label: 'Remittance' },
    { to: '/mobile-banking', label: 'Mobile Banking' },
  ];

  return (
    <header>
      <OpeningHours />
      <hr />
      <nav className={`navbar navbar-expand-lg navbar-light bg-light ${scrolled ? 'fixed-top opacity-50' : ''}`}>
        <div className="container">
          <Logo logo={settings.logo} imageUrl={imageUrl} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
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
              <Dropdown title="Product & Services" items={productServicesItems} />
            </ul>
          </div>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Navbar;