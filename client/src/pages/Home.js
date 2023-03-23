import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="home">
      <h1>Welcome To The Financial Forge</h1>
      <p>
        This is a place where you can keep track of your finances View and
        modify your expense, income, and more.
      </p>
      <p>
        Financial Forge helps you organize your finances so you can save for
        that next big purchase!
      </p>
      <div className="home_nav">
        <Link to="/income">Income</Link>
        <Link to="/expense">Expense</Link>
      </div>
    </section>
  );
};

export default Home;
