import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  const [newPokemonName, setNewPokemonName] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        if (!name) {
          console.error('Pokemon name is undefined');
          return;
        }

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error(`Error fetching details for ${name}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPokemonName.trim()) {
      console.error('Pokemon name cannot be empty');
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${newPokemonName.toLowerCase()}`);
      setPokemonDetails(response.data);
    } catch (error) {
      console.error(`Error fetching details for ${newPokemonName}:`, error);
    } finally {
      // eslint-disable-next-line no-unused-vars
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{name} Details</h2>
      {pokemonDetails ? (
        <div>
          <img src={pokemonDetails.sprites.front_default} alt={`${name} sprite`} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">Abilities</h3>
          <ul className="list-disc pl-4">
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-red-500">No details available.</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block mb-2">
          Enter a Pokemon name:
          <input
            type="text"
            value={newPokemonName}
            onChange={(e) => setNewPokemonName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Fetch Pokemon Details
        </button>
      </form>
    </div>
  );
};

export default PokemonDetails;
