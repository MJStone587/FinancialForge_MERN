import React, { useState } from 'react';
import { useExpDataContext } from '../hooks/useExpDataContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { parseISO } from 'date-fns';

const ExpenseDetails = (expense) => {
  const { dispatch } = useExpDataContext();
  const { user } = useAuthContext();
  const [modal, setModal] = useState(false);

  const handleDel = async () => {
    if (!user) {
      expense.setError('Unauthorized Access!');
      return;
    }
    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/expense/' + expense.id,
      {
        method: 'DELETE',
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_DATA', payload: json });
    }
  };

  const handleUpdate = async () => {
    expense.setName(expense.name);
    expense.setCategory(expense.category);
    expense.setDateReceived(parseISO(expense.dateReceived));
    expense.setDescription(expense.description);
    expense.setPaymentType(expense.paymentType);
    expense.setTotal(expense.total);
    expense.setExpID(expense.id);
    console.log(expense.id);
  };

  const modalOn = () => {
    setModal(true);
  };
  const modalOff = (e) => {
    if (e.target.className === 'modal' || e.target.className === 'close') {
      setModal(false);
    }
  };

  return (
    <div className="expense-card">
      <span onClick={handleDel} className="material-symbols-outlined">
        Delete
      </span>
      <h2 className="expense-title" onClick={modalOn}>
        {expense.name}
      </h2>
      <p className="expense-total">
        <strong>Total:</strong>${expense.total}
      </p>
      <span
        className="material-symbols-outlined"
        id="expense-edit"
        onClick={handleUpdate}
      >
        Edit
      </span>
      <article
        className="modal"
        onClick={modalOff}
        style={modal ? { display: 'flex' } : { display: 'none' }}
      >
        <div className="modal-content">
          <div className="modal-content-header">
            <span className="close">X</span>
            <h2>{expense.name}</h2>
          </div>
          <div className="modal-content-body">
            <p className="expense-description">{expense.description}</p>
            <p>
              <strong>Date Received: </strong>
              {expense.dateReceivedF}
            </p>
            <p>
              <strong>Category: </strong>
              {expense.category}
            </p>
            <p>
              <strong>Payment Type: </strong>
              {expense.paymentType}
            </p>
            <p>
              <strong>Total: </strong>${expense.total}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ExpenseDetails;
