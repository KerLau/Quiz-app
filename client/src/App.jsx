import { useState } from "react";
import Login from "./components/Login/Login.jsx";
import Logout from "./components/Login/Logout/Logout.jsx";
//import './Global.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      <header className="app-header"></header>
      <main className="app-main">
        {isLoggedIn ? (
          <>
            <HomePage />
            <Logout onLogout={handleLogout} />
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}

export default App;
