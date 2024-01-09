// src/components/FavoritePokemonList.tsx
import React from 'react';

interface FavoritePokemonListProps {
  favorites: string[];
}

const FavoritePokemonList: React.FC<FavoritePokemonListProps> = ({ favorites }) => {
  return (
    <div>
      <h2>Favorite Pokemon</h2>
      <ul>
        {favorites.map((pokemon, index) => (
          <li key={index}>{pokemon}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritePokemonList;
