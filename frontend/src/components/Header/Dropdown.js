// Dropdown.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ title, items }) => (
  <li className="nav-item dropdown">
    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      {title}
    </Link>
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
      {items.map((item, index) => (
        item.divider ? <hr key={index} className="dropdown-divider" /> : <li key={index}><Link className="dropdown-item" to={item.to}>{item.label}</Link></li>
      ))}
    </ul>
  </li>
);

export default Dropdown;