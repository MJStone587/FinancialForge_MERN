import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import forgeIcon from '../images/forge-ltblue.png';

function Navbar() {
  return (
    <section className="navbar-container">
      <div className="navbar-image-container">
        <Link to="/">
          <img src={forgeIcon} alt="Forge Icon" id="navbar-image"></img>
        </Link>
      </div>
      <nav className="navbar-links">
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/summary">
          <h2>Summary</h2>
        </Link>
        <Link to="/income">
          <h2>Income</h2>
        </Link>
        <Link to="/expense">
          <h2>Expense</h2>
        </Link>
        <Link to="/login">
          <h2>Login</h2>
        </Link>
      </nav>
    </section>
  );
}

export default Navbar;
