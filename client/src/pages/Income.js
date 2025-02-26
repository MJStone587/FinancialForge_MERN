import React, { useEffect, useState, useRef, useMemo } from "react";
import { useIncDataContext } from "../hooks/useIncDataContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";

function Income() {
	const { data, dispatch } = useIncDataContext();
	const { user } = useAuthContext();
	const [incID, setIncID] = useState("");
	const [name, setName] = useState("");
	const [showUpdateBtn, setShowUpdateBtn] = useState(false);
	const [newInc, setNewInc] = useState();
	const [updated, setUpdated] = useState(false);
	//const [isLoading, setIsLoading] = useState(true);
	const [deletion, setDeletion] = useState(true);
	const [docsPerPage, setDocsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [modal, setModal] = useState(false);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [total, setTotal] = useState("");
	const [dateReceived, setDate] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState("");
	const [emptyFields, setEmptyFields] = useState([]);
	const incomeTableDisplayRef = useRef(null);
	const selectedPageRef = useRef(null);

	useEffect(() => {
		const fetchIncome = async () => {
			const response = await fetch(
				`https://financialforge-mern.onrender.com/catalog/income?currentPage=${currentPage}&docsPerPage=${docsPerPage}`,
				{
					headers: {
						mode: "cors",
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_DATA", payload: json.incomeList });
				setTotalPages(Math.ceil(json.docTotal / docsPerPage));
				//setIsLoading(false);
				setUpdated(false);
				setNewInc(false);
				setDeletion(false);
			} else if (!response.ok) {
				console.log("Error Fetching Data", json.error);
				//setIsLoading(true);
			}
		};
		if (!user) {
			console.log("Unauthorized Access! Please login or create an account to continue.");
		} else {
			fetchIncome();
		}
	}, [dispatch, user, currentPage, docsPerPage, updated, newInc, deletion]);

	//form submission handler
	const submitHandler = async (e) => {
		e.preventDefault();
		if (!user) {
			setError("Unathorized Access!");
			return;
		}
		// create income object from input data
		const income = {
			name,
			description,
			category,
			total,
			dateReceived,
		};
		//post request to server with income object
		const response = await fetch("https://financialforge-mern.onrender.com/catalog/income/create", {
			method: "POST",
			body: JSON.stringify(income),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		});
		const json = await response.json();

		// handle error or success
		if (!response.ok) {
			setError(json.error);
			setSuccess("");
			setEmptyFields(json.emptyFields);
		} else if (response.ok) {
			setName("");
			setDescription("");
			setCategory("");
			setTotal("");
			setDate("");
			setError(null);
			setEmptyFields([]);
			setNewInc(true);
			setSuccess("Success: New income has been added!");
			dispatch({ type: "CREATE_DATA", payload: json });
		}
	};

	//form update handler
	const handleUpdate = (selectedItem) => {
		setName(selectedItem.name);
		setCategory(selectedItem.category);
		setDate(selectedItem.dateReceived.split("T")[0]);
		setDescription(selectedItem.description);
		setTotal(selectedItem.total);
		setIncID(selectedItem._id);
		setShowUpdateBtn(true);
	};
	//api update handler
	const updateHandler = async (e) => {
		e.preventDefault();
		// income object from input data
		if (!user) {
			setError("Unauthorized Access! Please login or create an account to continue.");
			return;
		}
		const income = {
			name,
			description,
			dateReceived,
			total,
			category,
		};

		// put request to server to update single income document
		const response = await fetch(
			"https://financialforge-mern.onrender.com/catalog/income/" + incID,
			{
				method: "PUT",
				body: JSON.stringify(income),
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
			setError(null);
			setEmptyFields([]);
			setShowUpdateBtn(false);
			setUpdated(true);
			setSuccess("Success: Income has been updated!");
		}
	};
	//delete handler
	const handleDel = async (selectedItem) => {
		// check if user is logged in
		if (!user) {
			setError("Unauthorized Access! Please login or create an account to continue.");
			return;
		}
		//fetch request to server
		const response = await fetch(
			"https://financialforge-mern.onrender.com/catalog/income/" + selectedItem._id,
			{
				mode: "cors",
				method: "DELETE",
				headers: { Authorization: `Bearer ${user.token}` },
			}
		);
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_DATA", payload: json });
			setDeletion(true);
		} else {
			console.log("The response failed");
		}
	};
	const modalOn = () => {
		setModal(true);
	};
	const modalOff = () => {
		setModal(false);
	};

	const clearBtn = (e) => {
		e.preventDefault();
		setName("");
		setDescription("");
		setCategory("");
		setTotal("");
		setDate("");
		setShowUpdateBtn(false);
		setError(null);
		setSuccess(null);
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

	return (
		<section>
			<div className='finance-display'>
				<div className='finance-display-left'>
					<div className='finance-display-heading'>
						<h2 id='income-table-title'>Income List</h2>
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
					<div className='finance-table-container' ref={incomeTableDisplayRef}>
						<table className='finance-table'>
							<thead>
								<tr id='heading-columns-income'>
									<th>Edit</th>
									<th>Name</th>
									<th>Total</th>
									<th>Date</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody id='expense-table-body'>
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
												<p>{item.name}</p>
											</td>
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
														<strong>Total: </strong>${item.total}
													</p>
												</Modal.Body>
												<Modal.Footer>{item.description}</Modal.Footer>
											</Modal>
											<td>
												<p>$ {item.total}</p>
											</td>
											<td>
												<p>{item.date_received_med}</p>
											</td>
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
						<h2>+ Create New Income</h2>
					</div>
					<Form className='income-form'>
						<FloatingLabel controlId='income-title' label='Title'>
							<Form.Control
								type='text'
								onChange={(e) => setName(e.target.value)}
								value={name}
								placeholder='Title'
								className={emptyFields.includes("name") ? "error" : ""}
							/>
						</FloatingLabel>
						<FloatingLabel controlId='income-description' label='Description'>
							<Form.Control
								placeholder='Description'
								type='text'
								onChange={(e) => setDescription(e.target.value)}
								value={description}
								className={emptyFields.includes("description") ? "error" : ""}
							/>
						</FloatingLabel>
						<FloatingLabel controlId='income-category' label='Category'>
							<Form.Select
								name='income-category'
								onChange={(e) => setCategory(e.target.value)}
								value={category}
								className={emptyFields.includes("category") ? "error" : ""}
							>
								<option value='' defaultValue></option>
								<option value='Job'>Job</option>
								<option value='Gift'>Gift</option>
								<option value='Investment'>Investment</option>
								<option value='Savings'>Savings</option>
								<option value='Other'>Other</option>
							</Form.Select>
						</FloatingLabel>
						<FloatingLabel controlId='income-total' label='Total'>
							<Form.Control
								type='number'
								placeholder='Total'
								onChange={(e) => setTotal(e.target.value)}
								value={total}
								className={emptyFields.includes("total") ? "error" : ""}
							/>
						</FloatingLabel>
						<FloatingLabel controlId='income-date' label='Date'>
							<Form.Control
								type='date'
								onChange={(e) => {
									setDate(e.target.value);
								}}
								value={dateReceived}
								selected={dateReceived}
								placeholder='Date'
								className={emptyFields.includes("date") ? "error" : "date"}
							/>
						</FloatingLabel>
						<Button onClick={submitHandler} bsPrefix={showUpdateBtn ? "disabled" : ""}>
							CREATE Income
						</Button>
						<Button onClick={updateHandler} bsPrefix={showUpdateBtn ? "" : "disabled"}>
							UPDATE Income
						</Button>
						<Button onClick={clearBtn} variant='light' bsPrefix={showUpdateBtn ? "" : "disabled"}>
							Clear
						</Button>
						<div className='warning-text'>
							{error && <p className='error-message'>{error}</p>}
							{success && <p className='success-message'>{success}</p>}
						</div>
					</Form>
				</aside>
			</div>
		</section>
	);
}

export default Income;
