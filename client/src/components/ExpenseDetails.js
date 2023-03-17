import React, { useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';

const ExpenseDetails = (expense) => {
  const { dispatch } = useDataContext();
  const [modal, setModal] = useState(false);

  const handleDel = async () => {
    const response = await fetch('/catalog/expense/' + expense.id, {
      method: 'DELETE',
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_DATA', payload: json });
    }
  };

  const handleUpdate = async () => {
    expense.setName(expense.name);
    expense.setCategory(expense.category);
    expense.setDateReceived(expense.dateReceived);
    expense.setDescription(expense.description);
    expense.setPaymentType(expense.paymentType);
    expense.setTotal(expense.total);
    expense.setExpID(expense.id);
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
              <strong>Date Received:</strong>
              {expense.dateReceivedF}
            </p>
            <p>
              <strong>Category</strong>
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
