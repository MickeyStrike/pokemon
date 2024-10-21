import { Card, CardContent, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react';
import Grid from '@mui/material/Grid2';
import { ResponseDetailPokemon } from '@/types';

interface ICardPokemonProps {
  data: ResponseDetailPokemon
}

const colorTypes: Record<"0" | "1" | "2" | "3", string> = {
  "0": "#E66D00",
  "1": "#DE2C2C",
  "2": "#01B956",
  "3": "#E34C88"
}

const CardPokemon:FC<ICardPokemonProps> = ({
  data
}) => {

  const selectColor = (idx: number): string => {
    if (idx > 3) return colorTypes["3"];
    return colorTypes[String(idx) as "0" | "1" | "2" | "3"];
  }

  if (Object.keys(data).length === 0) return <p>not found</p>

  return (
    <Card sx={{ width: 325, borderRadius: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          width={275}
          height={275}
          alt='not found'
          src={data?.sprites?.front_default ?? ""}
        />
      </div>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "baseline" }}>
        <Typography variant="h5" component="h5" sx={{ color: '#B3B6B8', fontWeight: 'bold' }}>
          #{data.order}
        </Typography>
        <Typography variant="h1" component="h1" sx={{ color: '#42494D', fontWeight: 'bold', fontSize: '2.5rem', marginTop: 2, marginBottom: 2, lineClamp: 1 }}>
          {data.name}
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%" }}>
          {data.types.map((dataType, index) => (
            <Grid size={{ xs: 6 }} key={index} component="div">
              <Chip
                label={dataType.type.name}
                sx={{
                  width: "100%",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  color: "white",
                  background: selectColor(index)
                }}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CardPokemon;
