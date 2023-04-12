import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emptyFields, setEmptyFields] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginCred = {
      email,
      password,
    };
    const response = await fetch('http://localhost:5000/catalog/user/login', {
      method: 'POST',
      body: JSON.stringify(loginCred),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccess(null);
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      setSuccess(json.success);
      setEmptyFields([]);
    }
  };

  return (
    <section className="signin-container">
      <div className="signin-container-header">
        <h1>Sign In</h1>
      </div>
      <div className="signin-card">
        <div className="signin-card-left">
          <h2>Not a member?</h2>
          <Link to="/signup">Signup</Link>
        </div>
        <div className="signin-card-right">
          <form className="signin-card-form" onSubmit={submitHandler}>
            <label className="input-label email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emptyFields.includes('email') ? 'error' : ''}
            />
            <label className="input-label pass">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={emptyFields.includes('password') ? 'error' : ''}
            />
            <button type="submit">Submit</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
