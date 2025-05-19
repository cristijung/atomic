"use client"; 

import React from 'react';
import Image from 'next/image'; 
import { useFavorites } from '../../../hooks/useFavorites'; 
import { ImageItem } from '../../../types/interfaces/interfaces';

interface ImagemCardProps {
  item: ImageItem;
}

export function ImagemCard({ item }: ImagemCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image
        src={item.url}
        alt={item.title}
        width={item.width || 300}
        height={item.width ||200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        {item.description && <p className="text-gray-600 text-sm mb-3">{item.description}</p>}
        <button
          onClick={() => toggleFavorite(item.id)}
          className={`w-full py-2 px-4 rounded font-medium transition-colors
            ${favorite
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
        >
          {favorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </button>
      </div>
    </div>
  );
}