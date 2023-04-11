import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  // state managment and variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emptyFields, setEmptyFields] = useState('');

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
    const response = await fetch('http://localhost:5000/catalog/user/create', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();
    // handle response failure or success and act accordingly
    if (!response.ok) {
      setError(json.error);
      setSuccess(null);
      setEmptyFields(json.emptyFields);
    } else if (response.ok) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setEmptyFields([]);
      setError(null);
      setSuccess(json.success);
    }
  };

  return (
    <section className="signup-container">
      <div className="signup-header-container">
        <h1>Signup</h1>
      </div>
      <div className="signup-card">
        <div className="signup-card-left">
          <h2>Already A Member?</h2>
          <Link to="/login">Login</Link>
        </div>
        <div className="signup-card-right">
          <form className="signup-form" onSubmit={submitHandler}>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={emptyFields.includes('firstName') ? 'error' : ''}
            />
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={emptyFields.includes('lastName') ? 'error' : ''}
            />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emptyFields.includes('email') ? 'error' : ''}
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={emptyFields.includes('password') ? 'error' : ''}
            />
            <button type="submit">Submit</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
      </div>
    </section>
  );
}

export default Signup;
