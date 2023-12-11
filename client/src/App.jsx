import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/NavBar/Navbar";
import Categories from "./components/Categories/Categories";
import Quiz from "./components/Quiz/Quiz";
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
          path="/categories"
          element={<Categories />}
        />
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
       <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}
export default App;