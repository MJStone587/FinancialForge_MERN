import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import forgeIcon from "../images/forge-ltblue.png";
import { useAuthContext } from "../hooks/useAuthContext";

function Header(props) {
  const { user } = useAuthContext();

  return (
    <header className="header-container">
      <div className="header-left">
        <Link to="/">
          <img src={forgeIcon} alt="Forge Icon" id="header-image"></img>
        </Link>
        <h2>Financial Forge</h2>
      </div>
      <div className="header-right">
        {user && <span className="welcome-sign">{user.email}</span>}
        <span
          className="material-symbols-outlined"
          id="hamburger"
          onClick={props.toggleNav}
        >
          menu
        </span>
      </div>
    </header>
  );
}

export default Header;
