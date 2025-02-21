import React from "react";
import { useRef, useEffect, useMemo } from "react";
import { useState } from "react";
import { useExpDataContext } from "../hooks/useExpDataContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";

const Receipt = () => {
	const { data, dispatch } = useExpDataContext();
	const { user } = useAuthContext();
	const [_id, set_id] = useState("");
	const [name, setName] = useState("");
	const [showUpdateBtn, setShowUpdateBtn] = useState(false);
	const [docsPerPage, setDocsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState();
	const [description, setDescription] = useState("");
	const [paymentType, setPaymentType] = useState("");
	const [total, setTotal] = useState("");
	const [category, setCategory] = useState("");
	const [dateReceived, setDate] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState("");
	const [emptyFields, setEmptyFields] = useState([]);
	const expenseTableDisplayRef = useRef(null);
	const selectedPageRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`https://financialforge-mern.onrender.com/catalog/expense?currentPage=${currentPage}&docsPerPage=${docsPerPage}`,
				{
					headers: {
						mode: "cors",
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_DATA", payload: json.expenseList });
				setTotalPages(Math.ceil(json.docTotal / docsPerPage));
				setLoading(false);
			} else if (!response.ok) {
				console.log("Error Fetching Data", json.error);
				setLoading(true);
			}
		};
		if (!user) {
			console.log("Unauthorized Access! Please login or create an account to continue.");
		} else {
			fetchData();
		}
	}, [dispatch, user, currentPage, docsPerPage]);

	const modalOn = () => {
		setModal(true);
	};
	const modalOff = () => {
		setModal(false);
	};

	//Form Submit Handler
	const submitHandler = async (e) => {
		e.preventDefault();
		if (!user) {
			setError("Unauthorized Access! Please login or create an account to continue.");
			return;
		}
		// create expense object from input data
		const expense = {
			name,
			description,
			paymentType,
			dateReceived,
			total,
			category,
		};

		// wait for response from server
		const response = await fetch(
			"https://financialforge-mern.onrender.com/catalog/expense/create",
			{
				method: "POST",
				body: JSON.stringify(expense),
				headers: {
					mode: "cors",
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			}
		);
		const json = await response.json();

		// handle error and success
		if (!response.ok) {
			setError(json.error);
			setSuccess("");
			setEmptyFields(json.emptyFields);
		} else if (response.ok) {
			setName("");
			setDescription("");
			setTotal("");
			setDate("");
			setCategory("");
			setPaymentType("");
			setError(null);
			setEmptyFields([]);
			setSuccess("Success: New expense has been added!");
			dispatch({ type: "CREATE_DATA", payload: json });
		}
	};

	const handleDocsPerPage = (e) => {
		setDocsPerPage(e.target.value);
	};
	const clickPage = (selectedPage) => {
		setCurrentPage(selectedPage);
		// selected page color change to blue previous page back to white
	};
	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};
	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	const pagesDisplay = useMemo(() => {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}, [totalPages]);

	//delete handler
	const handleDel = async (selectedItem) => {
		// check if user is logged in
		if (!user) {
			setError("Unauthorized Access! Please login or create an account to continue.");
			return;
		}
		//fetch request to server
		const response = await fetch(
			"https://financialforge-mern.onrender.com/catalog/expense/" + selectedItem._id,
			{
				mode: "cors",
				method: "DELETE",
				headers: { Authorization: `Bearer ${user.token}` },
			}
		);
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_DATA", payload: json });
		} else {
			console.log("The response failed");
		}
	};

	//update handler
	const handleUpdate = (selectedItem) => {
		setName(selectedItem.name);
		setCategory(selectedItem.category);
		setDate(selectedItem.dateReceived.split("T")[0]);
		setDescription(selectedItem.description);
		setPaymentType(selectedItem.paymentType);
		setTotal(selectedItem.total);
		set_id(selectedItem._id);
		setShowUpdateBtn(true);
	};

	//FORM UPDATE HANDLER
	const updateHandler = async (e) => {
		e.preventDefault();
		// expense object from input data
		if (!user) {
			setError("Unauthorized Access! Please login or create an account to continue.");
			return;
		}
		const expense = {
			name,
			description,
			paymentType,
			dateReceived,
			total,
			category,
		};

		// put request to server to update single expense document
		const response = await fetch(
			"https://financialforge-mern.onrender.com/catalog/expense/" + _id,
			{
				method: "PUT",
				body: JSON.stringify(expense),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			}
		);

		const json = await response.json();
		// handle error and success
		if (!response.ok) {
			setError(json.error);
			setSuccess("");
		} else {
			setName("");
			setDescription("");
			setTotal("");
			setDate("");
			setCategory("");
			setPaymentType("");
			setError(null);
			setEmptyFields([]);
			setShowUpdateBtn(false);
			setSuccess("Success: Expense has been updated!");
		}
	};

	//clear btn handler
	const clearBtn = (e) => {
		e.preventDefault();
		setName("");
		setDescription("");
		setTotal("");
		setDate("");
		setCategory("");
		setPaymentType("");
		setShowUpdateBtn(false);
		setError(null);
		setSuccess(null);
	};

	return (
		<section>
			<div className='finance-display'>
				<div className='finance-display-left'>
					<div className='finance-display-heading'>
						<h2 id='expense-table-title'>Expense List</h2>
					</div>
					<div className='finance-displayPerPage-container'>
						<p>Display Per Page:</p>
						<Form.Select size='sm' onChange={handleDocsPerPage}>
							<option value='10'>Default(10)</option>
							<option value='3'>3</option>
							<option value='5'>5</option>
							<option value='15'>15</option>
						</Form.Select>
					</div>
					<div className='finance-table-container' ref={expenseTableDisplayRef}>
						<table className='finance-table'>
							<thead>
								<tr id='heading-columns-expense'>
									<th>Edit</th>
									<th>Name</th>
									<th>Amount</th>
									<th>Total</th>
									<th>Date</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{data &&
									data.map((item) => (
										<tr key={item._id}>
											<td className='edit-td'>
												<span
													className='material-symbols-outlined'
													onClick={() => handleUpdate(item)}
												>
													Edit
												</span>
											</td>
											<td className='name-td modalOpen' onClick={modalOn}>
												{item.name}
											</td>
											<td>{item.length}</td>
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
													<Modal.Title id='modal-content-header'>{item.name}</Modal.Title>
												</Modal.Header>
												<Modal.Body>
													<p>
														<strong>Date Received: </strong>
														{item.dateReceived.split("T")[0]}
													</p>
													<p>
														<strong>Category: </strong>
														{item.category}
													</p>
													<p>
														<strong>Payment Type: </strong>
														{item.paymentType}
													</p>
													<p>
														<strong>Total: </strong>${item.total}
													</p>
												</Modal.Body>
												<Modal.Footer>{item.description}</Modal.Footer>
											</Modal>
											<td>$ {item.total}</td>
											<td>{item.date_received_med}</td>
											<td className='delete-td'>
												<span onClick={() => handleDel(item)} className='material-symbols-outlined'>
													Delete
												</span>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
					<div className='pagination'>
						<button onClick={handlePrevPage}>Prev</button>
						{pagesDisplay &&
							pagesDisplay.map((index) => (
								<li
									className='pageNumber'
									ref={selectedPageRef}
									key={index}
									onClick={() => clickPage(index)}
								>
									{index}
								</li>
							))}
						<button onClick={handleNextPage}>Next</button>
					</div>
				</div>
				<aside className='finance-display-right'>
					<div className='finance-form-header'>
						<h2>+ Create New Expense</h2>
					</div>
					<Form id='expense-form'>
						<FloatingLabel label='Name'>
							<Form.Control
								type='text'
								onChange={(e) => setName(e.target.value)}
								value={name}
								placeholder='Name'
								className={emptyFields.includes("name") ? "error" : ""}
							/>
						</FloatingLabel>
						<FloatingLabel label='Description'>
							<Form.Control
								type='text'
								onChange={(e) => setDescription(e.target.value)}
								value={description}
								placeholder='Description'
								className={emptyFields.includes("description") ? "error" : ""}
							/>
						</FloatingLabel>
						<FloatingLabel label='Category'>
							<Form.Select
								id='expense-category'
								onChange={(e) => setCategory(e.target.value)}
								value={category}
								placeholder='Category'
								className={emptyFields.includes("category") ? "error" : ""}
							>
								<option value='' defaultValue></option>
								<option value='Entertainment'>Entertainment</option>
								<option value='Food'>Food</option>
								<option value='House'>House</option>
								<option value='Car'>Car</option>
								<option value='Work'>Work</option>
								<option value='Clothing'>Clothing</option>
								<option value='Pet'>Pet</option>
								<option value='Self-Care'>Self-Care</option>
								<option value='Other'>Other</option>
							</Form.Select>
						</FloatingLabel>
						<FloatingLabel label='Payment Type'>
							<Form.Select
								id='expense-type'
								onChange={(e) => setPaymentType(e.target.value)}
								value={paymentType}
								placeholder='Payment Type'
								className={emptyFields.includes("paymentType") ? "error" : ""}
							>
								<option value='' defaultValue></option>
								<option value='Debit'>Debit</option>
								<option value='Credit'>Credit</option>
								<option value='Cash'>Cash</option>
								<option value='Gift Card'>Gift Card</option>
								<option value='Check'>Check</option>
								<option value='Other'>Other</option>
							</Form.Select>
						</FloatingLabel>
						<FloatingLabel label='Total'>
							<Form.Control
								id='expense-description'
								type='number'
								onChange={(e) => setTotal(e.target.value)}
								placeholder='Total'
								value={total}
								className={emptyFields.includes("total") ? "error" : ""}
							/>
						</FloatingLabel>
						<FloatingLabel label='Date'>
							<Form.Control
								type='date'
								onChange={(e) => setDate(e.target.value)}
								value={dateReceived}
								selected={dateReceived}
								placeholder='Date'
								className={emptyFields.includes("dateReceived") ? "error" : "dateReceived"}
							/>
						</FloatingLabel>
						<Button onClick={submitHandler} bsPrefix={showUpdateBtn ? "disabled" : ""}>
							CREATE Expense
						</Button>
						<Button onClick={updateHandler} bsPrefix={showUpdateBtn ? "" : "disabled"}>
							UPDATE Expense
						</Button>
						<Button
							type='reset'
							variant='light'
							onClick={clearBtn}
							bsPrefix={showUpdateBtn ? "" : "disabled"}
						>
							Clear
						</Button>
						{error && <p className='error-message'>{error}</p>}
						{success && <p className='success-message'>{success}</p>}
					</Form>
				</aside>
			</div>
		</section>
	);
};

export default Receipt;
