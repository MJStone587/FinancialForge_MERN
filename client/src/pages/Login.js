import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [visiblePass, setVisiblePass] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const { login, error, success, emptyFields } = useLogin();
	const labelEmail = "Email";
	const labelPassword = "Password";
	const eyeToggle = "login-password-visibility-toggle";

	const submitHandler = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	const eyeHandler = () => {
		setVisiblePass(!visiblePass);
		setIsVisible(!isVisible);
	};
	return (
		<section>
			<div id='login-container'>
				<div id='login-card'>
					<div id='login-card-left'>
						<div id='redirect-signup'>
							<h2>Not a member?</h2>
							<Link to='/signup'>Signup</Link>
						</div>
						<div id='sample-login'>
							<p>
								Don't want to make a login? Use our sample login to test the apps functionality.
							</p>
							<h4>Sample Login</h4>
							<p>
								<strong>Email:</strong> samplelogin@fakemail.com <br /> <strong>Password:</strong>
								Sample@password1
							</p>
						</div>
					</div>
					<div id='login-card-right'>
						<Form id='login-card-form' onSubmit={submitHandler}>
							<Form.Label visuallyHidden='true'>Email:</Form.Label>
							<Form.Control
								type='email'
								aria-label={labelEmail}
								placeholder='Email'
								aria-required='true'
								id='login-email-input'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={emptyFields.includes("email") ? "error" : ""}
							/>
							<InputGroup bsPrefix='login-password-input' size='sm'>
								<Form.Label visuallyHidden='true'>Password:</Form.Label>
								<Form.Control
									type={visiblePass ? "text" : "password"}
									placeholder='Password'
									aria-label={labelPassword}
									aria-required='true'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className={emptyFields.includes("password") ? "error" : " "}
								/>

								<InputGroup.Text id='basic-addon1'>
									<span
										className='material-symbols-outlined eye faded'
										aria-label={eyeToggle}
										onClick={eyeHandler}
									>
										Visibility
									</span>
								</InputGroup.Text>
							</InputGroup>
							<Button type='submit' className='submitBtn loginBtn'>
								Login
							</Button>
							{error && <p className='error-message'>{error}</p>}
							{success && <p className='success-message'>{success}</p>}
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Login;
