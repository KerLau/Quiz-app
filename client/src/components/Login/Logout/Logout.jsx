import React from 'react';
import './Logout.css';

function Logout({ onLogout }) {
  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <button onClick={onLogout}>Sign Out</button>
    </div>
  );
}

export default Logout;
