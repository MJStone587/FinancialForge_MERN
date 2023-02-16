import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Income() {
  const [income, setIncome] = useState(null);

  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch('/catalog/income');
      const json = await response.json();
      if (response.ok) {
        setIncome(json);
      }
    };
    fetchIncome();
  }, []);

  return (
    <section className="income_container">
      <h1>Income Page</h1>
      <table>
        <thead>
          <tr>
            <th>Name:</th>
            <th>From:</th>
            <th>Date:</th>
            <th>Amount:</th>
          </tr>
        </thead>
        <tbody>
          {income &&
            income.map((income) => (
              <tr key={income._id}>
                <td>{income.name}</td>
                <td>{income.from}</td>
                <td>{income.date_month}</td>
                <td>${income.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/income/create">
        <h2>Add Income</h2>
      </Link>
    </section>
  );
}

export default Income;
