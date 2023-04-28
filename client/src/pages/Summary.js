import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function Summary() {
  const { user } = useAuthContext();
  const [expense, setExpense] = useState();
  const [income, setIncome] = useState();
  const [incGrandTotal, setIncGrandTotal] = useState();
  const [expGrandTotal, setExpGrandTotal] = useState();

  // request for all income data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://financialforge-mern.onrender.com/catalog/income',
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setIncome(json);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  // request for all expense data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://financialforge-mern.onrender.com/catalog/expense',
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setExpense(json);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  // method to add up income and expense data for display
  useEffect(() => {
    var incGrandTotal = 0;
    var expGrandTotal = 0;
    income && income.map((inc) => (incGrandTotal += inc.total));
    expense && expense.map((exp) => (expGrandTotal += exp.total));
    setIncGrandTotal(incGrandTotal.toFixed(2));
    // PERSONAL NOTE BELOW
    setExpGrandTotal(expGrandTotal.toFixed(2));
  }, [income, expense]);

  return (
    <section className="summary-container">
      <h1>Summary</h1>
      <p>Review all financial records</p>
      <h2 className="income-table-title">Income</h2>
      <div className="income-table-container">
        <table className="income-table">
          <thead>
            <tr className="income-header-row">
              <th>Name:</th>
              <th>Category:</th>
              <th>Total:</th>
            </tr>
          </thead>
          <tbody className="income-tbody">
            {income &&
              income.map((inc) => (
                <tr key={inc._id}>
                  <td>{inc.name}</td>
                  <td>{inc.category}</td>
                  <td>${inc.total}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <h3 className="income-total">Grand Total: ${incGrandTotal}</h3>
      <h2 className="expense-table-title">Expenses</h2>
      <div className="expense-table-container">
        <table className="expense-table">
          <thead>
            <tr className="expense-header-row">
              <th>Name:</th>
              <th>Payment Type:</th>
              <th>Category:</th>
              <th>Total:</th>
            </tr>
          </thead>
          <tbody className="expense-tbody">
            {expense &&
              expense.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp.name}</td>
                  <td>{exp.paymentType}</td>
                  <td>{exp.category}</td>
                  <td>${exp.total}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <h3 className="expense-total">Grand Total: ${expGrandTotal}</h3>
    </section>
  );
}

export default Summary;
