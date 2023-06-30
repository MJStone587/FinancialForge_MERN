import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <>
      {!user && (
        <section className="home">
          <div className="home-welcome">
            <h1>Welcome To The Financial Forge</h1>
            <p>
              We are here to help you organize your expenses. Record and keep
              track of your spending and saving.
            </p>
            <p>
              To get started Login with an existing user or Sign Up with a new
              email.
            </p>
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/signup">
                  Sign up
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </section>
      )}
      {user && (
        <section className="home">
          <div className="home-welcome">
            <h1>Welcome back, {user.name}!</h1>
            <p>Access your income, expense, and summary</p>
            <Nav className="flex-column">
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
            </Nav>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
