// src/components/FavoritePokemonList.js
import React, { useState } from 'react';

const FavoritePokemonList = ({ favorites, onAddPokemon }) => {
  const [newPokemon, setNewPokemon] = useState('');

  const handleAddPokemon = () => {
    if (newPokemon.trim() !== '' && !favorites.includes(newPokemon)) {
      onAddPokemon(newPokemon);
      setNewPokemon('');
    }
  };

  return (
    <div className="border rounded p-4 my-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">Favorite Pokemon</h2>
      <ul className="list-disc pl-4">
        {favorites.map((pokemon, index) => (
          <li key={index} className="text-lg mb-2">{pokemon}</li>
        ))}
      </ul>
      <div className="mt-4">
        <label className="block text-lg mb-2">Add New Pokemon:</label>
        <div className="flex">
          <input
            type="text"
            className="border rounded-l px-4 py-2 flex-grow"
            value={newPokemon}
            onChange={(e) => setNewPokemon(e.target.value)}
          />
          <button
            onClick={handleAddPokemon}
            className="bg-blue-500 text-white rounded-r px-4 py-2"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritePokemonList;
