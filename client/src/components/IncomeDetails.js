import React, { useState, useEffect } from "react";
import { useIncDataContext } from "../hooks/useIncDataContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Modal from "react-bootstrap/Modal";

const IncomeDetails = (income) => {
  const { dispatch } = useIncDataContext();
  const { user } = useAuthContext();
  const [modal, setModal] = useState(false);

  // If an entry has been updated refresh data

  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch("https://financialforge-mern.onrender.com/catalog/income", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_DATA", payload: json });
      }
    };
    if (user && income.updated) {
      fetchIncome();
      income.setUpdated(false);
    }
  }, [user, dispatch, income]);

  //button handler for deleting single object
  const handleDel = async () => {
    if (!user) {
      income.setError("Unauthorized Access!");
      return;
    }
    const response = await fetch(
      "https://financialforge-mern.onrender.com/catalog/income/" + income.id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_DATA", payload: json });
    }
  };

  // Update Handler -- Fills in the form and ID
  const handleUpdateClick = () => {
    income.setTotal(income.total);
    income.setName(income.name);
    income.setDescription(income.description);
    income.setCategory(income.category);
    income.setDate(income.dateReceived.split("T")[0]);
    income.setIncID(income.id);
    income.setShowUpdateBtn(true);
  };

  // Modal On - Off
  const modalOn = () => {
    setModal(true);
  };
  const modalOff = () => {
    setModal(false);
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
      <Modal
        show={modal}
        backdrop="true"
        animation="true"
        onHide={modalOff}
        size="lg"
        centered
        keyboard="true"
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-content-header">{income.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Date Received: </strong>
            {income.dateReceived.split("T")[0]}
          </p>
          <p>
            <strong>Category: </strong>
            {income.category}
          </p>
          <p>
            <strong>Total: </strong>${income.total}
          </p>
        </Modal.Body>
        <Modal.Footer>{income.description}</Modal.Footer>
      </Modal>
    </div>
  );
};

export default IncomeDetails;
