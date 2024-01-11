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

  const handleEditFavorite = (oldPokemon, newPokemon) => {
    // Implement the logic to edit a favorite Pokemon
    // This function should update the favorites state accordingly
  };

  const handleDeleteFavorite = (pokemon) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== pokemon));
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
            <li className="ml-auto">
              <h1 className="text-lg text-white">
                Click "Home" to Start Exploring Pokemon
              </h1>
            </li>
          </ul>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route
              path="/favorites"
              element={<FavoritePokemonList
                          favorites={favorites}
                          onAddFavorite={handleAddToFavorites}
                          onEditFavorite={handleEditFavorite}
                          onDeleteFavorite={handleDeleteFavorite} />}  // Pass onDeleteFavorite prop
            />
            <Route path="/pokemon/:name" element={<PokemonDetails />} />
            <Route path="/" element={<PokemonList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
