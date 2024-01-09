// src/components/PokemonList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PokemonThumbnail from './PokemonThumbnail';

const PokemonList: React.FC = () => {
  const [fullPokemonList, setFullPokemonList] = useState<string[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchFullPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const allPokemon = response.data.results.map((pokemon: { name: string }) => pokemon.name);
        setFullPokemonList(allPokemon);
        setFilteredPokemonList(allPokemon);
      } catch (error) {
        console.error('Error fetching full Pokemon list:', error);
      }
    };

    fetchFullPokemonList();
  }, []);

  const handleSearch = () => {
    // Filter the full list based on the entered search term
    const filteredPokemon = fullPokemonList.filter((pokemon) =>
      pokemon.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonList(filteredPokemon);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Pokemon List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPokemonList.map((pokemonName) => (
          <Link key={pokemonName} to={`/pokemon/${pokemonName.toLowerCase()}`}>
            <PokemonThumbnail name={pokemonName} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
