// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PokemonList from './PokemonList.tsx';
import PokemonDetails from './PokemonDetails.tsx';
import FavoritePokemonList from './FavoritePokemonList.tsx';

import 'tailwindcss/tailwind.css';  // Import Tailwind CSS styles

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const handleAddToFavorites = (pokemon) => {
    setFavorites((prevFavorites) => [...prevFavorites, pokemon]);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-blue-500 p-4">
          <ul className="flex">
            <li className="mr-6">
              <Link to="/" className="text-white"><h1>Home</h1></Link>
            </li>
            <li>
              <Link to="/favorites" className="text-white"><h1>Favorites</h1></Link>
            </li>
          </ul>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/pokemon/:name" element={<PokemonDetails />} />
            <Route
              path="/favorites"
              element={<FavoritePokemonList favorites={favorites} onAddFavorite={handleAddToFavorites} />}
            />
            <Route path="/" element={<PokemonList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
