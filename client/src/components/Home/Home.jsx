import React from "react";
import "./Home.css";
import bridge from "../../assets/Home/bridge.jpg";

const Home = ({ user }) => {
  return (
    <div className="rowC">
      <div className="title-section">
        {user && <h1>Welcome, {user.name}!</h1>}
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
  );
};

export default Home;
