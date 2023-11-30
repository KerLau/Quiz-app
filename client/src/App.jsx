import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        setUser={setUser}
        user={user}
      />
      <Routes>
        <Route
          path="/"
          element={<Home user={user} />}
        />
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
