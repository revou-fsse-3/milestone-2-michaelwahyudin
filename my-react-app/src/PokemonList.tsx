import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PokemonThumbnail from './PokemonThumbnail';

const PokemonList: React.FC = () => {
  const [fullPokemonList, setFullPokemonList] = useState<string[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string>('');

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
    setError('');

    // Validate that the input contains only letters
    if (/[^a-zA-Z]/.test(searchTerm)) {
      setError('Please enter only letters in the search field.');
      return;
    }

    const filteredPokemon = fullPokemonList.filter((pokemon) =>
      pokemon.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredPokemon.length === 0) {
      setError('Pokemon not found.');
    }

    setFilteredPokemonList(filteredPokemon);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Pokemon App</h1>
        <div className="flex items-center space-x-4"></div>
      </div>

      <div className="mb-8 mt-4"> 
  <h2>
    <input
      type="text"
      placeholder="Search Pokemon"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 rounded p-2 w-full mb-4"
    />
    <button
      onClick={handleSearch}
      className="bg-blue-500 text-white py-2 px-4 rounded ml-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue transition duration-300 ease-in-out"
    >
      Search
    </button>
  </h2>
  {error && <p className="text-red-500">{error}</p>}
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
