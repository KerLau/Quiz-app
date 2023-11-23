import React, { useState } from "react";
import "./Register.css";

function Register({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    // Add logic to handle registration (send data to the server, etc.)
    onClose(); // Close the modal after registration
  };

  return (
    <div className="register-modal">
      <div className="register-container">
        <h2>Sign up</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <button type="submit" className="register-button">
              Register
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

export default Register;
