// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Update import
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import FavoritePokemonList from './FavoritePokemonList';

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const handleAddToFavorites = (pokemon) => {
    setFavorites((prevFavorites) => [...prevFavorites, pokemon]);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/favorites" element={<FavoritePokemonList favorites={favorites} />} />
          <Route path="/" element={<PokemonList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;