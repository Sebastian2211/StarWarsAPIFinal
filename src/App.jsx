import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import './App.css';
import Navbar from './Navbar';
import StarWars from './starwars';
import Planets from './planets';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Who are you today?" element={<StarWars />} />
          <Route path="/What's your planet today?" element={<Planets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

