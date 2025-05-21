import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { CardInfoProps } from '../../../types/interfaces/interfaces';


export default function CardInfo({
  titulo,
  subtitulo,
  descricao,
  informacaoAdicional,
}: CardInfoProps) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>      
      {/* sx para estilização inline, m: 2 adiciona margem */}
      <CardHeader
        title={
          <Typography variant="h5" component="div">
            {titulo}
          </Typography>
        }
        subheader={
          subtitulo && (
            <Typography variant="subtitle1" color="text.secondary">
              {subtitulo}
            </Typography>
          )
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {descricao}
        </Typography>
        {informacaoAdicional && (
          <Typography variant="caption" display="block" sx={{ mt: 1.5 }}>
            {informacaoAdicional}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
