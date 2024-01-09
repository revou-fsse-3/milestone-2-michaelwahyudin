// src/components/FavoritePokemonList.js
import React from 'react';

const FavoritePokemonList = ({ favorites }) => {
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
