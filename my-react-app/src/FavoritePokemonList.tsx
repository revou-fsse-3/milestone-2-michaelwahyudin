import React, { useState } from 'react';

interface FavoritePokemonListProps {
  favorites: string[];
  onAddFavorite: (pokemon: string) => void;
}

const FavoritePokemonList: React.FC<FavoritePokemonListProps> = ({ favorites, onAddFavorite }) => {
  const [newPokemon, setNewPokemon] = useState<string>('');

  const handleAddFavorite = () => {
    if (newPokemon.trim() !== '') {
      onAddFavorite(newPokemon);
      setNewPokemon('');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Favorite Pokemon</h2>
      <ul className="list-disc pl-4">
        {favorites.map((pokemon, index) => (
          <li key={index} className="mb-2">{pokemon}</li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter Pokemon name"
          value={newPokemon}
          onChange={(e) => setNewPokemon(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddFavorite} className="bg-blue-500 text-white py-2 px-4 rounded">
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default FavoritePokemonList;
