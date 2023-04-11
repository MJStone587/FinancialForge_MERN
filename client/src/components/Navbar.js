import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/income">Income</Link>
        <Link to="/expense">Expense</Link>
        <Link to="/summary">Summary</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}

export default Navbar;
