import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const response = await axios.post("user/login", userCredentials);
      console.log("Authentication successful:", response.data);
      setAuthenticated(true);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      toast.error("Authentication failed", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("Authentication failed:", error.message);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="login-modal">
      <ToastContainer />
      <div className="overlay"></div>
      <div className="login-container">
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
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
          <div className="noaccount">
            <h4>Don't have an account?</h4>
            <button className="sign-up">
              <NavLink to="/register" className="link">
                Sign up
              </NavLink>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
