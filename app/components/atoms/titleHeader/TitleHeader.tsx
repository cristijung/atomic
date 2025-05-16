import React from "react";

import { TitleHeaderProps } from "../../../types/interfaces/interfaces";

export default function TitleHeader({ title, subtitle }: TitleHeaderProps) {
  return (
    <section className="">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-500 dark:text-white tracking-tight leading-tight hover:text-green-400">
        Seu Título Incrível Aqui
      </h1>
      <h1 className="text-3xl sm:text-5xl md:text-6xl pt-8 pb-8 text-red-100 font-weight: 600">{title}</h1>
      {subtitle && <p className="">{subtitle}</p>}
    </section>
  );
}
