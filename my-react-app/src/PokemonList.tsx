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
    const filteredPokemon = fullPokemonList.filter((pokemon) =>
      pokemon.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonList(filteredPokemon);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Pokemon App</h1>
        <div className="flex items-center space-x-4">
          {/* Use inline styles to conditionally hide the links */}
          <Link
            to="/"
            className={`text-blue-500 hover:underline transition duration-300 ease-in-out transform ${
              process.env.NODE_ENV === 'production' ? 'invisible' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`text-blue-500 hover:underline transition duration-300 ease-in-out transform ${
              process.env.NODE_ENV === 'production' ? 'invisible' : ''
            }`}
          >
            Favorites
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue transition duration-300 ease-in-out"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPokemonList.map((pokemonName) => (
          <Link
            key={pokemonName}
            to={`/pokemon/${pokemonName.toLowerCase()}`}
            className="hover:transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <PokemonThumbnail name={pokemonName} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
