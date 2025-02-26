import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Signup() {
	// state managment and variables
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [visiblePass, setVisiblePass] = useState(true);
	const [isVisible, setVisible] = useState(false);
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [emptyFields, setEmptyFields] = useState("");
	const labelFirstName = "First Name";
	const labelLastName = "Last Name";
	const labelEmail = "Email";
	const labelPassword = "Password";

	// form submission handler
	const submitHandler = async (e) => {
		e.preventDefault();
		// create user object from input
		const user = {
			firstName,
			lastName,
			email,
			password,
		};
		// send post request to server with user object
		const response = await fetch("https://financialforge-mern.onrender.com/catalog/user/create", {
			method: "POST",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" },
		});

		const json = await response.json();
		// handle response failure or success and act accordingly
		if (!response.ok) {
			setError(json.error);
			setSuccess(null);
			setEmptyFields(json.emptyFields);
		} else if (response.ok) {
			setFirstName("");
			setLastName("");
			setEmail("");
			setPassword("");
			setEmptyFields([]);
			setError(null);
			setSuccess(json.success);
		}
	};

	const eyeClickHandler = () => {
		setVisiblePass(!visiblePass);
		setVisible(!isVisible);
	};

	return (
		<section>
			<div id='signup-container'>
				<div id='signup-card'>
					<div id='signup-card-left'>
						<h2>Already A Member?</h2>
						<Link to='/login'>Login</Link>
					</div>
					<div id='signup-card-right'>
						<Form id='signup-form' onSubmit={submitHandler}>
							<Form.Control
								type='text'
								placeholder='First Name'
								aria-label={labelFirstName}
								aria-required='true'
								value={firstName}
								id='firstName'
								onChange={(e) => setFirstName(e.target.value)}
								className={emptyFields.includes("firstName") ? "error" : ""}
							/>
							<Form.Control
								type='text'
								placeholder='Last Name'
								aria-label={labelLastName}
								aria-required='true'
								value={lastName}
								id='lastName'
								onChange={(e) => setLastName(e.target.value)}
								className={emptyFields.includes("lastName") ? "error" : ""}
							/>
							<Form.Control
								type='email'
								placeholder='Email'
								aria-label={labelEmail}
								aria-required='true'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={emptyFields.includes("email") ? "error" : ""}
							/>
							<InputGroup bsPrefix='signup-password-field '>
								<Form.Control
									type={visiblePass ? "password" : "text"}
									placeholder='Password'
									aria-label={labelPassword}
									aria-required='true'
									id='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className={emptyFields.includes("password") ? "error" : ""}
								/>
								<InputGroup.Text>
									<span className='material-symbols-outlined eye faded' onClick={eyeClickHandler}>
										{isVisible ? "visibility_off" : "visibility"}
									</span>
								</InputGroup.Text>
							</InputGroup>
							<Button type='submit' className='submitBtn'>
								Sign Up
							</Button>
						</Form>
						{error && <p className='error-message'>{error}</p>}
						{success && <p className='success-message'>{success}</p>}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Signup;
