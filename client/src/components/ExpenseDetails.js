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
    const response = await fetch('/catalog/expense/' + expense.id, {
      method: 'UPDATE',
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_DATA', payload: json });
    }
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
    <div className="expense_card">
      <span onClick={handleDel} className="material-symbols-outlined">
        Delete
      </span>
      <h2 className="expense_title" onClick={modalOn}>
        {expense.name}
      </h2>
      <p className="expense_total">
        <strong>Total:</strong>${expense.total}
      </p>
      <span className="material-symbols-outlined" id="expense_edit">
        Edit
      </span>
      <article
        className="modal"
        onClick={modalOff}
        style={modal ? { display: 'flex' } : { display: 'none' }}
      >
        <div className="modal_content">
          <div className="modal_content_header">
            <span className="close">X</span>
            <h2>{expense.name}</h2>
          </div>
          <div className="modal_content_body">
            <p className="expense_description">{expense.description}</p>
            <p>
              <strong>Date Received:</strong>
              {expense.date}
            </p>
            <p>
              <strong>Category</strong>
              {expense.category}
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
