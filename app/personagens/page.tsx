import React from "react";
import CardInfo from "../components/atoms/cardInfo/CardInfo";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Personagens() {
  return (
    <>
      <section>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom component="h1">
            Personagens de Star Wars
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <CardInfo
              titulo="Anakin Skywalker"
              subtitulo="Lord Sith"
              descricao="Melhor Vilão"
              informacaoAdicional="Atualização mais recente"
            />
            <CardInfo
              titulo="Padmé Amídala"
              subtitulo="Senadora"
              descricao="Líder dos rebeldes"
              informacaoAdicional=""
            />
            <CardInfo
              titulo="Léia Organa"
              subtitulo="Princesa"
              descricao="General rebelde"
              informacaoAdicional="Atualização mais recente"
            />
            <CardInfo
              titulo="Luke Skywalker"
              subtitulo="Mestre Jedi"
              descricao="Piloto das X Wings Rebelde"
              informacaoAdicional="Atualização mais recente"
            />
          </Box>
        </Box>
      </section>
    </>
  );
}
