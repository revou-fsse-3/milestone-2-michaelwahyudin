// src/components/PokemonThumbnail.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface PokemonThumbnailProps {
  name: string;
  imageUrl: string;  // Add this line
}

const PokemonThumbnail: React.FC<PokemonThumbnailProps> = ({ name, imageUrl }) => {
  return (
    <div className="max-w-xs mx-auto">
      <Link to={`/pokemon/${name}`} className="block rounded-lg overflow-hidden border shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
        <img src={imageUrl} alt="Pokeball thumbnail" className="w-full h-auto" />
        <p className="text-center text-lg font-semibold py-2 bg-gray-200">{name}</p>
      </Link>
    </div>
  );
};

export default PokemonThumbnail;
