import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { login, error, success, emptyFields } = useLogin();
  const labelEmail = "Email";
  const labelPassword = "Password";

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
          <form className="login-card-form" onSubmit={submitHandler}>
            <input
              type="email"
              aria-label={labelEmail}
              placeholder="Email"
              aria-required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emptyFields.includes("email") ? "error" : ""}
            />
            <div className="eye-wrapper-login">
              <span
                className="material-symbols-outlined eye faded"
                onClick={eyeHandler}
              >
                {isVisible ? "visibility_off" : "visibility"}
              </span>
            </div>
            <input
              type={visiblePass ? "text" : "password"}
              placeholder="Password"
              aria-label={labelPassword}
              aria-required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={emptyFields.includes("password") ? "error" : " "}
            />
            <button type="submit" className="submitBtn loginBtn">
              Login
            </button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
