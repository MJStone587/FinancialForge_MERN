import React from "react";
import "../index.css";
import forgeIcon from "../images/forge-ltblue.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header(props) {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = async () => {
    logout();
  };
  /*
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
*/

  return (
    <Navbar expand="md" bg="dark" variant="dark" collapseOnSelect>
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={forgeIcon} alt="Forge Icon" id="header-image"></img>
        </Navbar.Brand>
        <Navbar.Text>Financial Forge </Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!user && (
            <Nav className="navbar-right-loggedOut nav-links">
              <Nav.Item>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </Nav.Item>
              {user && <span>{user.email}</span>}
            </Nav>
          )}
          {user && (
            <Nav className="navbar-right-loggedIn nav-links">
              <Nav.Item>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/income">
                  Income
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/expense">
                  Expense
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/summary">
                  Summary
                </Nav.Link>
              </Nav.Item>
              <Button onClick={handleClick} className="navbar-logout">
                Logout
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
