import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = async () => {
    logout();
  };

  return (
    <div className="navbar-container">
      {!user && (
        <nav className="navLinks loggedOut">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          {user && <span>{user.email}</span>}
        </nav>
      )}
      {user && (
        <nav className="navLinks loggedIn expanded">
          <Link to="/">Home</Link>
          <Link to="/income">Income</Link>
          <Link to="/expense">Expense</Link>
          <Link to="/summary">Summary</Link>
          <button onClick={handleClick} className="navbar-logout">
            Logout
          </button>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
