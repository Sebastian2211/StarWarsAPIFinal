// App.js

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import StarWars from './starwars';
import Planets from './planets';
import Movies from './movies';
import Registration from './Registration';
import Login from './Login';
import Logout from './Logout'; // Import the Logout component

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} onLogout={handleLogout} />
        {user ? ( // Check if a user is logged in
          <Logout onLogout={handleLogout} />
        ) : null}
        <Routes>
          <Route path="/who-are-you-today" element={<StarWars />} />
          <Route path="/whats-your-planet-today" element={<Planets />} />
          <Route
            path="/whats-your-movie-today"
            element={<Movies user={user} />}
          />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<Navigate to="/whats-your-movie-today" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
