import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonThumbnail = ({ name, onClick }) => {
  const [pokemonSprite, setPokemonSprite] = useState(null);

  useEffect(() => {
    const fetchPokemonSprite = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const sprite = response.data.sprites.front_default;
        setPokemonSprite(sprite);
      } catch (error) {
        console.error(`Error fetching sprite for ${name}:`, error);
      }
    };

    fetchPokemonSprite();
  }, [name]);

  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <img
        src={pokemonSprite || 'https://via.placeholder.com/96'}
        alt={`${name} sprite`}
        className="w-24 h-24 mb-2"
      />
      <p>{name}</p>
    </div>
  );
};

export default PokemonThumbnail;
