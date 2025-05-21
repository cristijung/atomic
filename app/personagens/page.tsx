import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardInfo from "../components/atoms/cardInfo/CardInfo";

export default function Personagens() {
  return (
    <>
      <section className="container">
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom component="h1">
            Personagens Star Wars
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <CardInfo
              titulo="Card Principal"
              subtitulo="Informação Relevante"
              descricao="Este é um exemplo de um card utilizando Material-UI em um projeto Next.js com TypeScript. Ele demonstra o uso dos componentes Card e Typography."
              informacaoAdicional="Última atualização: Agora mesmo!"
            />
            <CardInfo
              titulo="Outro Card"
              descricao="Este card não possui subtítulo nem informação adicional, mostrando a flexibilidade do componente."
            />
            <CardInfo
              titulo="Card com Texto Longo"
              descricao="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              subtitulo="Demonstração"
            />
          </Box>
        </Box>
      </section>
    </>
  );
}
