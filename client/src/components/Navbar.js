import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar-links">
        <Link to="/" id="link">
          <h2>Home</h2>
        </Link>
        <Link to="/income" id="link">
          <h2>Income</h2>
        </Link>
        <Link to="/expense" id="link">
          <h2>Expense</h2>
        </Link>
        <Link to="/summary" id="link">
          <h2>Summary</h2>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
