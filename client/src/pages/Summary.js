import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Table from "react-bootstrap/Table";

function Summary() {
	const { user } = useAuthContext();
	const [expense, setExpense] = useState();
	const [income, setIncome] = useState();
	const [incGrandTotal, setIncGrandTotal] = useState();
	const [expGrandTotal, setExpGrandTotal] = useState();
	const [balance, setBalance] = useState();

	// request for all income data
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("https://financialforge-mern.onrender.com/catalog/income", {
				headers: { Authorization: `Bearer ${user.token}` },
			});
			const json = await response.json();
			if (response.ok) {
				setIncome(json);
			}
		};
		if (user) {
			fetchData();
		}
	}, [user]);

	// request for all expense data
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("https://financialforge-mern.onrender.com/catalog/expense", {
				headers: { Authorization: `Bearer ${user.token}` },
			});
			const json = await response.json();
			if (response.ok) {
				setExpense(json);
			}
		};
		if (user) {
			fetchData();
		}
	}, [user]);

	// method to add up income, expense data and format the results
	useEffect(() => {
		var incGrandTotal = 0;
		var expGrandTotal = 0;
		income && income.map((inc) => (incGrandTotal += inc.total));
		expense && expense.map((exp) => (expGrandTotal += exp.total));
		setIncGrandTotal(incGrandTotal.toFixed(2));
		setExpGrandTotal(expGrandTotal.toFixed(2));
		var balance = incGrandTotal - expGrandTotal;
		setBalance(balance.toFixed(2));
	}, [income, expense, balance]);

	return (
		<section>
			<div id='summary-container'>
				<div id='table-container'>
					<h2 id='summary-income-table-title'>Income</h2>
					<div id='summary-income-table-container'>
						<Table striped='false' bordered hover responsive='md'>
							<thead>
								<tr>
									<th>Name:</th>
									<th>Category:</th>
									<th>Total:</th>
								</tr>
							</thead>
							<tbody>
								{income &&
									income.map((inc) => (
										<tr key={inc._id}>
											<td>{inc.name}</td>
											<td>{inc.category}</td>
											<td>${inc.total}</td>
										</tr>
									))}
							</tbody>
						</Table>
						<h3>
							<strong>Total: </strong>${incGrandTotal}
						</h3>
					</div>
					<h2 id='summary-expense-table-title'>Expenses</h2>
					<div id='summary-expense-table-container'>
						<Table striped='false' bordered hover responsive='md' size='sm'>
							<thead>
								<tr>
									<th>Name:</th>
									<th>Payment Type:</th>
									<th>Category:</th>
									<th>Total:</th>
								</tr>
							</thead>
							<tbody>
								{expense &&
									expense.map((exp) => (
										<tr key={exp._id}>
											<td>{exp.name}</td>
											<td>{exp.paymentType}</td>
											<td>{exp.category}</td>
											<td>${exp.total}</td>
										</tr>
									))}
							</tbody>
						</Table>
						<h3>
							<strong>Total: </strong>${expGrandTotal}
						</h3>
					</div>
				</div>
				<div id='balance-wrapper'>
					<h2 id='balance'>Balance: ${balance}</h2>
				</div>
			</div>
		</section>
	);
}

export default Summary;
