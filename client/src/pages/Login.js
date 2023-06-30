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
    <section className="login-container">
      <div className="login-container-header">
        <h1>Login</h1>
      </div>
      <div className="login-card">
        <div className="login-card-left">
          <h2>Not a member?</h2>
          <Link to="/signup">Signup</Link>
        </div>
        <div className="login-card-right">
          <Form className="login-card-form" onSubmit={submitHandler}>
            <Form.Control
              type="email"
              aria-label={labelEmail}
              placeholder="Email"
              aria-required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emptyFields.includes("email") ? "error" : ""}
            />
            <InputGroup bsPrefix="login-password-input" size="sm">
              <Form.Control
                type={visiblePass ? "text" : "password"}
                placeholder="Password"
                aria-label={labelPassword}
                aria-required="true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={emptyFields.includes("password") ? "error" : " "}
              />

              <InputGroup.Text>
                <span
                  className="material-symbols-outlined eye faded"
                  aria-label={eyeToggle}
                  onClick={eyeHandler}
                >
                  {isVisible ? "visibility_off" : "visibility"}
                </span>
              </InputGroup.Text>
            </InputGroup>
            <Button type="submit" className="submitBtn loginBtn">
              Login
            </Button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Login;
