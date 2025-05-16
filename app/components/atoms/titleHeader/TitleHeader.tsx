import React from "react";

import { TitleHeaderProps } from "../../../types/interfaces/interfaces";

export default function TitleHeader({ title, subtitle }: TitleHeaderProps) {
  return (
    <section className="w-full text-center py-20 md:py-32 lg:py-40">
      <h1
        className="text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight leading-tight
                 drop-shadow-lg"
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 font-light max-w-prose mx-auto
                  drop-shadow-md"
        >
          {subtitle}
        </p>
      )}
    </section>
  );
}
