import React, { useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import { parseISO } from 'date-fns';

const IncomeDetails = (income) => {
  const { dispatch } = useDataContext();
  const [modal, setModal] = useState(false);

  const handleDel = async () => {
    const response = await fetch('/catalog/income/' + income.id, {
      method: 'DELETE',
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_DATA', payload: json });
    }
  };

  //Overnight income required parseISO to properly set date
  // but expense doesn't?? both using same format
  const handleUpdateClick = () => {
    income.setTotal(income.total);
    income.setName(income.name);
    income.setDescription(income.description);
    income.setCategory(income.category);
    income.setDate(parseISO(income.dateReceived));
    income.setIncID(income.id);
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
    <div className="income-card">
      <span onClick={handleDel} className="material-symbols-outlined">
        Delete
      </span>
      <h2 className="income-title" onClick={modalOn}>
        {income.name}
      </h2>
      <p className="income-amt">
        <strong>Total:</strong>${income.total}
      </p>
      <span
        className="material-symbols-outlined"
        id="income-edit"
        onClick={handleUpdateClick}
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
            <h2 className="modal-title">{income.name}</h2>
          </div>
          <div className="modal-content-body">
            <p className="income-description">{income.description}</p>
            <p>
              <strong>Date Received: </strong>
              {income.dateReceivedF}
            </p>
            <p>
              <strong>Category: </strong>
              {income.category}
            </p>
            <p>
              <strong>Total: </strong>${income.total}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default IncomeDetails;
