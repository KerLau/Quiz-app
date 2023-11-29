import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = ({ authenticated, setAuthenticated, setUser }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    // Clear user authentication state and local storage
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    // Navigate to the homepage after logout
    navigate('/');
  };
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Synapster
      </Link>
      <div className="nav-links">
        {authenticated ? (
          // If the user is authenticated, show the "Log Out" button
          <button onClick={logoutHandler}>Log Out</button>
        ) : (
          // If the user is not authenticated, show "Sign Up" and "Login" links
          <>
            <Link to="/register" className="nav-button">Sign Up</Link>
            <Link to="/login" className="nav-button">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;