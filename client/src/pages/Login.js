import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState(null);
  //const [success, setSuccess] = useState(null);

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
          <form className="signin-card-form">
            <label
              className="input-label email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              Email
            </label>
            <input type="email" />
            <label className="input-label pass">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
