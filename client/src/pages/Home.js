import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { user } = useAuthContext();

  return (
    <>
      {!user && (
        <section className="home">
          <h1>Welcome To The Financial Forge</h1>
          <p>
            Financial Forge is here to help you organize your expenses. Record
            and keep track of your spending and saving.
          </p>
          <p>
            To get started Login with an existing user or Sign Up with a new
            email.
          </p>
          <div className="home-nav">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </section>
      )}
      {user && (
        <section className="home">
          <h1>Welcome back, {user.name}!</h1>
          <p>Access your income, expense, and summary</p>
          <div className="home-nav">
            <Link to="/income">Income</Link>
            <Link to="/expense">Expense</Link>
            <Link to="/summary">Summary</Link>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
