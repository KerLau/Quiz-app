import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>&copy; {new Date().getFullYear()} Synapster. All rights reserved</p>
    </footer>
  );
};

export default Footer;
