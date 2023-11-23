// Login.jsx

import React, { useState } from "react";
import "./Login.css";

function Login({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    onClose(); // Close the modal when login is successful
  };

  return (
    <div className="login-modal">
      <div className="overlay"></div>
      <div className="login-container">
        <button className="close-button" onClick={onClose}>
          {/* Close button */}
          <span>&times;</span>
        </button>
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
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
            <button type="submit" className="login-button">
              Login
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
