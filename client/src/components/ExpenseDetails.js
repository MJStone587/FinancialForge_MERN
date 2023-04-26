import React, { useState, useEffect } from 'react';
import { useExpDataContext } from '../hooks/useExpDataContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { parseISO } from 'date-fns';

const ExpenseDetails = (expense) => {
  const { dispatch } = useExpDataContext();
  const { user } = useAuthContext();
  const [modal, setModal] = useState(false);

  // run fetch after update to remove old document THIS BANDAID FIX UNTIL UNDERSTAND WHATS
  // GOING ON WITH STATE
  useEffect(() => {
    const fetchExpense = async () => {
      const response = await fetch('http://localhost:5000/catalog/expense', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_DATA', payload: json });
      }
    };
    if (user && expense.updated) {
      fetchExpense();
      expense.setUpdated(false);
    }
  }, [user, dispatch, expense]);

  //delete handler
  const handleDel = async () => {
    // check if user is logged in
    if (!user) {
      expense.setError('Unauthorized Access!');
      return;
    }
    //fetch request to server
    const response = await fetch(
      'http://localhost:5000/catalog/expense/' + expense.id,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_DATA', payload: json });
    }
  };
  //update handler
  const handleUpdate = async () => {
    expense.setName(expense.name);
    expense.setCategory(expense.category);
    expense.setDateReceived(parseISO(expense.dateReceived));
    expense.setDescription(expense.description);
    expense.setPaymentType(expense.paymentType);
    expense.setTotal(expense.total);
    expense.set_id(expense.id);
    expense.setShowUpdateBtn(true);
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
