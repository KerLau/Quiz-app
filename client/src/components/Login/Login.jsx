import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 
  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, email, password); 
  };

  const handleClose = () => {
  
  };

  return (
    <div className="login-modal">
      <div className="overlay" onClick={handleClose}></div>
      <div className="login-container">    
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="action-items">
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
