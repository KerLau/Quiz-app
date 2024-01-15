// Footer.jsx

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Synapster. All rights reserved.</p>
      {/* Add additional footer content or links as needed */}
    </footer>
  );
};

export default Footer;
