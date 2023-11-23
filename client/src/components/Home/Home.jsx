import React, { useState } from "react";
import "./Home.css";
import bridge from "../../assets/Home/bridge.jpg";
import Login from "../Login/Login";
import Register from "../Register/Register"; // Import the Register component

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleRegisterModalClose = () => {
    setShowRegisterModal(false);
  };

  return (
    <>
      <div className="rowC">
        <div className="button-container">
          <button onClick={handleRegisterClick}>Sign Up</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
        <div className="title-section">
          <h1>Synapster</h1>
          <h2>AI generated quiz app</h2>
          <p>
            Introducing our AI Quiz App, crafted by a dynamic team of three
            full-stack web developers. Elevate your knowledge with a seamless
            blend of engaging quizzes powered by cutting-edge artificial
            intelligence. Dive into a personalized learning experience that
            adapts to your progress, making education interactive and fun.
          </p>
        </div>
        <img className="bridge" src={bridge} alt="Bridge" />
      </div>

      {/* Render the Login and Register modals */}
      {showLoginModal && <Login onClose={handleLoginModalClose} />}
      {showRegisterModal && <Register onClose={handleRegisterModalClose} />}
    </>
  );
};

export default Home;
