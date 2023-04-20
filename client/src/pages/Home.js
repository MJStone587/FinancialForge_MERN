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
            This is a place where you can keep track of your finances View and
            modify your expense, income, and more.
          </p>
          <p>
            Financial Forge helps you organize your finances so you can save for
            that next big purchase. Login or sign up to get started!
          </p>
          <div className="home-nav">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </section>
      )}
      {user && (
        <section className="home">
          <h1>Welcome back!</h1>
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
