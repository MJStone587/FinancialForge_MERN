import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import forgeIcon from '../images/forge-ltblue.png';

function Navbar() {
  return (
    <div className="navbar_container">
      <div className="navbar_image_container">
        <Link to="/">
          <img src={forgeIcon} alt="Forge Icon" id="navbar_image"></img>
        </Link>
      </div>
      <div className="navbar_links">
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/summary">
          <h2>Summary</h2>
        </Link>
        <Link to="/income">
          <h2>Income</h2>
        </Link>
        <Link to="/receipt">
          <h2>Receipt</h2>
        </Link>
        <Link to="/login">
          <h2>Login</h2>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
