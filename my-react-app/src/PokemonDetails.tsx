// src/components/PokemonDetails.tsx
import React, { useEffect, useState } from 'react';
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
    </div>
  );
};

export default PokemonDetails;
