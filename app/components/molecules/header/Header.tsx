import React from "react";
import Image from "next/image";
import TitleHeader from "../../atoms/titleHeader/TitleHeader";
import Fundo from "../../../../public/wall_top.jpg";

export default function Header() {
  return (
    <header className="relative h-[550px] flex items-center justify-center text-center">
      {" "}
      {/* text-center para o conteúdo */}
      <Image
        src={Fundo}
        alt="Imagem de fundo do cabeçalho"
        layout="fill"
        objectFit="cover"
        priority={true}
      />
      <div className="relative z-10 p-4">
        <TitleHeader title="Star Wars" subtitle="Que a Força esteja com você" />
        {/*  outras coisas aqui */}
      </div>
    </header>
  );
}
