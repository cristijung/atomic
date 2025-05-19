"use client";

import React from "react";
import { ImageItem } from "../../../types/interfaces/interfaces";
import { ImagemCard } from "../../atoms/imgCard/ImageCard";

interface ListaCardsProps {
  items: ImageItem[];
}

export function ListaCards({ items }: ListaCardsProps) {
  if (!items || items.length === 0) {
    return <p>Nenhuma imagem para exibir.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <ImagemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
