import React from 'react';
import { useDataContext } from '../hooks/useDataContext';
import { Link } from 'react-router-dom';

const IncomeDetails = (income) => {
  const { dispatch } = useDataContext();

  const handleDel = async () => {
    const response = await fetch('/catalog/income/' + income.id, {
      method: 'DELETE',
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_DATA', payload: json });
    }
  };
  return (
    <div className="income_card" key={income.id}>
      <span onClick={handleDel} className="income_del">
        Delete
      </span>
      <Link className="income_title" to={income.id}>
        {income.name}
      </Link>
      <p className="income_description">{income.description}</p>
      <p className="income_date">{income.date}</p>
      <p className="income_amt">
        <strong>Total:</strong>${income.amount}
      </p>
      <span className="income_update">Update</span>
    </div>
  );
};

export default IncomeDetails;
