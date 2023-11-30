import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    const user = {
      name: event.target['name'].value,
      email: event.target['email'].value,
      password: event.target['password'].value
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', user);

      if (response.data) {
        console.log("Registration successful:", response.data);
        toast.success("Registration successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        // Delay navigation to ensure the user sees the notification
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (err) {
      console.error('Registration failed:', err.response.data.message);
      toast.error("Registration failed",{
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="register-modal">
      <ToastContainer />
      <div className="register-container">
        <h2>Sign up</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="action-items">
            <button type="submit" className="register-button">Register</button>
            <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
          <div className="error">{error}</div>
        </form>
      </div>
    </div>
  );
}

export default Register;
