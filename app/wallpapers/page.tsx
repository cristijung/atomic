import React from "react";
import { ListaCards } from "../components/molecules/cards/ListCards";
import { mockImages } from "../data/imagensData";

export default function WallPapers() {
  const imagesToDisplay = mockImages;
  return (
    <>
      <h1 className="text-2xl font-bold my-4 text-center">
        Galeria de Wallpapers
      </h1>

      <ListaCards items={imagesToDisplay} />
    </>
  );
}
