// Logo.js
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ logo, imageUrl }) => {
  const logoUrl = `${imageUrl}${logo}`;
  console.log('Logo URL:', logoUrl); // Debugging log

  return (
    <Link className="navbar-brand" to="/">
      {logo ? <img src={logoUrl} alt="Logo" width="30" height="30" className="d-inline-block align-text-top" /> : "Navbar"}
    </Link>
  );
};

export default Logo;