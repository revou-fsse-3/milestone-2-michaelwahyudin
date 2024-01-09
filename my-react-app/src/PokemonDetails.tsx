// src/components/PokemonDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Ability {
  ability: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  abilities: Ability[];
  sprites: {
    front_default: string;
  };
}

interface PokemonDetailsProps {
  // Add any other props if needed
}

const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  // New state for the form input
  const [newPokemonName, setNewPokemonName] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        if (!name) {
          // Handle the case where 'name' is undefined
          console.error('Pokemon name is undefined');
          return;
        }

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        console.log('API Response:', response.data);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error(`Error fetching details for ${name}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPokemonName.trim()) {
      // If input is empty, do not proceed
      console.error('Pokemon name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${newPokemonName.toLowerCase()}`);
      setPokemonDetails(response.data);
    } catch (error) {
      console.error(`Error fetching details for ${newPokemonName}:`, error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{name} Details</h2>
      {pokemonDetails ? (
        <div>
          <img src={pokemonDetails.sprites.front_default} alt={`${name} sprite`} />
          <h3>Abilities</h3>
          <ul>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No details available.</p>
      )}

      {/* Form for entering a new Pokemon name */}
      <form onSubmit={handleSubmit}>
        <label>
          Enter a Pokemon name:
          <input
            type="text"
            value={newPokemonName}
            onChange={(e) => setNewPokemonName(e.target.value)}
          />
        </label>
        <button type="submit">Fetch Pokemon Details</button>
      </form>
    </div>
  );
};

export default PokemonDetails;
