import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePass, setVisiblePass] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { login, error, success, emptyFields } = useLogin();

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
        <h1>Sign In</h1>
      </div>
      <div className="login-card">
        <div className="login-card-left">
          <h2>Not a member?</h2>
          <Link to="/signup">Signup</Link>
        </div>
        <div className="login-card-right">
          <form className="login-card-form" onSubmit={submitHandler}>
            <label className="input-label email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emptyFields.includes('email') ? 'error' : ''}
            />
            <label className="input-label pass">Password</label>
            <div className="eye-wrapper">
              <span
                className="material-symbols-outlined eye faded"
                onClick={eyeHandler}
              >
                {isVisible ? 'visibility_off' : 'visibility'}
              </span>
            </div>
            <input
              type={visiblePass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={emptyFields.includes('password') ? 'error' : ' '}
            />
            <button type="submit">Login</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
