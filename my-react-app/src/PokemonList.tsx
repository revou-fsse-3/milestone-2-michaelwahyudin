// src/components/PokemonList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import PokemonThumbnail from './PokemonThumbnail';

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        const names = response.data.results.map((pokemon: { name: string }) => pokemon.name);
        setPokemonList(names);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Pokemon List</h2>
      <div className="grid grid-cols-3 gap-4">
        {pokemonList.map((pokemonName) => (
          // Use Link to wrap each PokemonThumbnail and provide a 'to' prop with the route
          <Link key={pokemonName} to={`/pokemon/${pokemonName}`}>
            <PokemonThumbnail name={pokemonName} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
