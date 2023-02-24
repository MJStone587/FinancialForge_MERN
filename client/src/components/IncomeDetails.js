import React from 'react';
import { useDataContext } from '../hooks/useDataContext';

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
    <div className="income_card">
      <span onClick={handleDel} className="income_del">
        Delete
      </span>
      <h3 className="income_title" onClick={income.modalOn}>
        {income.name}
      </h3>
      <p className="income_description">{income.description}</p>
      <p className="income_date">{income.date}</p>
      <p className="income_amt">Total: ${income.amount}</p>
      <span className="income_update">Update</span>
    </div>
  );
};

export default IncomeDetails;
