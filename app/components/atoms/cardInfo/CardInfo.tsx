import React from "react";
import { CardInfoProps } from "@/app/types/interfaces/interfaces";
import Card from "@mui/material/Card";
import { CardContent, CardHeader, Typography } from "@mui/material";


export default function CardInfo({
  titulo,
  subtitulo,
  descricao,
  informacaoAdicional,
}: CardInfoProps) {
  return (
    <>
      <section className="container">
        <Card sx={{ maxWidth: 345, m: 2 }}>
          <CardHeader
            title={
              <Typography variant="h5" component="div">
                {titulo}
              </Typography>
            }
            subheader={
              subtitulo && (
                <Typography variant="subtitle1" color="textSecondary">
                  {subtitulo}
                </Typography>
              )
            }
          />
          <CardContent>
            <Typography variant="body2" color='textSecondary' gutterBottom>{descricao}</Typography>
            <Typography variant="body2" color='textSecondary' gutterBottom>{informacaoAdicional}</Typography>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
