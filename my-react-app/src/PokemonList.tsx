// src/components/PokemonList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import PokemonThumbnail from './PokemonThumbnail';

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<string[]>([]);

  useEffect(() => {
    const fetchRandomPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const allPokemon = response.data.results.map((pokemon: { name: string }) => pokemon.name);
        const shuffledPokemon = allPokemon.sort(() => Math.random() - 0.5);
        const randomPokemon = shuffledPokemon.slice(0, 9);

        setPokemonList(randomPokemon);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchRandomPokemonList();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Pokemon List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pokemonList.map((pokemonName) => (
          // Wrap PokemonThumbnail with Link
          <Link key={pokemonName} to={`/pokemon/${pokemonName.toLowerCase()}`}>
            <PokemonThumbnail name={pokemonName} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
