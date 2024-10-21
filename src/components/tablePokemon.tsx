import React, { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Chip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ResponseDetailPokemon } from '@/types';
import { colorEvolution, colorStats, colorTypes } from '@/types/colorPicker';
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/helper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface IPokemonTableProps {
  listPokemon: ResponseDetailPokemon[]
}

const PokemonTable:FC<IPokemonTableProps> = ({ listPokemon = [] }) => {

  const router = useRouter()

  const selectColor = (idx: number, type: "types" | "stats" | "evolution"): string => {
    if (type === "types") {
      if (idx > 3) return colorTypes["3"];
      return colorTypes[String(idx) as "0" | "1" | "2" | "3"];
    }
    else if (type === "stats") {
      if (idx > 5) return colorStats["5"];
      return colorStats[String(idx) as "0" | "1" | "2" | "3" | "4" | "5"];
    }
    else if (type === "evolution") {
      if (idx > 3) return colorEvolution["3"];
      return colorEvolution[String(idx) as "0" | "1" | "2" | "3"];
    }
    return ""
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '24px', overflowX: 'auto', background: "rgb(255 255 255 / 85%)" }}>
      <Table aria-label="Pokemon Table">
        <TableBody>
          {listPokemon.map((pokemon) => (
            <TableRow key={pokemon.name} onClick={() => router.push(`/${pokemon.name}`)} sx={{ cursor: "pointer" }}>
              <TableCell>
                <Image
                  src={pokemon?.sprites?.front_default ?? ""}
                  width={100}
                  height={100}
                  alt={pokemon.name}
                />
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">{pokemon.id}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">{capitalizeFirstLetter(pokemon.name)}</Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" gap="8px">
                  {pokemon.types.map((type, idx) => (
                    <Chip key={type.type.name} label={type.type.name} sx={{ backgroundColor: selectColor(idx, "types"), color: 'white', padding: "7px 25px", fontWeight: "bold", fontSize: "1.25rem" }} />
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonTable;
