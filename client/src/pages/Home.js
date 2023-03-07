import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="home">
      <h1>Welcome To The Financial Forge</h1>
      <p>This is a place where you can keep track of your finances</p>
      <p>View your spending, savings, income and more.</p>
      <p>
        Financial Forge helps you organize your finances so you can save for
        that next big purchase!
      </p>
      <h2>To get started login with existing user or create new login</h2>
      <div className="home_nav">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </section>
  );
};

export default Home;
