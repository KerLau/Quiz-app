import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Login({ setAuthenticated, setUser }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredentials = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:3000/login",
        userCredentials
      );
      console.log("Authentication successful:", response.data);
      localStorage.setItem("token", response.data.token);
      setAuthenticated(true);
      setUser(response.data.user);
      navigate('/');
    } catch (error) {
      console.error("Authentication failed:", error.message);
    }
  };
  return (
    <div className="login-modal">
      <div className="overlay"></div>
      <div className="login-container">
        <button className="close-button" onClick={() => navigate('/')}>
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
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;