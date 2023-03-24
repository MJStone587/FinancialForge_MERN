import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import forgeIcon from '../images/forge-ltblue.png';

function Header(props) {
  return (
    <section className="header-container">
      <div className="header-left">
        <Link to="/">
          <img src={forgeIcon} alt="Forge Icon" id="header-image"></img>
        </Link>
        <h2>Financial Forge</h2>
      </div>
      <div className="header-right">
        <span
          className="material-symbols-outlined"
          id="hamburger"
          onClick={props.toggleNav}
        >
          menu
        </span>
      </div>
    </section>
  );
}

export default Header;
