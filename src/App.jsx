import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import StarWars from './starwars';
import Planets from './planets';
import Movies from './movies';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Who are you today?" element={<StarWars />} />
          <Route path="/What's your planet today?" element={<Planets />} />
          <Route path="/What's your movie today?" element={<Movies />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
