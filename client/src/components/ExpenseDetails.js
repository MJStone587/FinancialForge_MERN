import React, { useState, useEffect } from "react";
import { useExpDataContext } from "../hooks/useExpDataContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Modal from "react-bootstrap/Modal";

const ExpenseDetails = (expense) => {
	const { dispatch } = useExpDataContext();
	const { user } = useAuthContext();
	const [modal, setModal] = useState(false);
	// run fetch after update to remove old document THIS BANDAID FIX UNTIL UNDERSTAND WHATS
	// GOING ON WITH STATE
	/*
	useEffect(() => {
		const fetchExpense = async () => {
			const response = await fetch("https://financialforge-mern.onrender.com/catalog/expense", {
				headers: { Authorization: `Bearer ${user.token}` },
			});
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_DATA", payload: json });
			}
		};
		if (user && expense.updated) {
			fetchExpense();
			expense.setUpdated(false);
		}
	}, [user, dispatch, expense]); */

	//delete handler
	const handleDel = async () => {
		// check if user is logged in
		if (!user) {
			expense.setError("Unauthorized Access!");
			return;
		}
		//fetch request to server
		const response = await fetch(
			"https://financialforge-mern.onrender.com/catalog/expense/" + expense.id,
			{
				method: "DELETE",
				headers: { Authorization: `Bearer ${user.token}` },
			}
		);
		const json = await response.json();
		if (response.ok) {
			dispatch({ type: "DELETE_DATA", payload: json });
		}
	};
	//update handler
	const handleUpdate = async () => {
		expense.setName(expense.name);
		expense.setCategory(expense.category);
		expense.setDateReceived(expense.dateReceived.split("T")[0]);
		expense.setDescription(expense.description);
		expense.setPaymentType(expense.paymentType);
		expense.setTotal(expense.total);
		expense.set_id(expense.id);
		expense.setShowUpdateBtn(true);
	};

	const modalOn = () => {
		setModal(true);
	};
	const modalOff = () => {
		setModal(false);
	};

	return (
		<div className='expense-card'>
			<span className='material-symbols-outlined' id='expense-edit' onClick={handleUpdate}>
				Edit
			</span>
			<h2 className='expense-title' onClick={modalOn}>
				{expense.name}
			</h2>
			<p className='expense-total'>Total: ${expense.total}</p>
			<span onClick={handleDel} className='material-symbols-outlined'>
				Delete
			</span>
			<Modal
				show={modal}
				backdrop='true'
				animation='true'
				onHide={modalOff}
				size='lg'
				centered
				keyboard='true'
			>
				<Modal.Header closeButton>
					<Modal.Title id='modal-content-header'>{expense.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						<strong>Date Received: </strong>
						{expense.dateReceived.split("T")[0]}
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
				</Modal.Body>
				<Modal.Footer>{expense.description}</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ExpenseDetails;
