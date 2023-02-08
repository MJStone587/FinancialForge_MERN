import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar_container">
      <Link to="/catalog">
        <h2>Summary</h2>
      </Link>
    </div>
  );
}

export default Navbar;
