"use client"
import React, { FC } from 'react'
import { Box, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Stats from '../stats';
import Evolution from '../evolution';
import { ResponseDetailPokemon } from '@/types';
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/helper';
import { colorEvolution, colorStats, colorTypes } from '@/types/colorPicker';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface DataEvo {
  name: string,
  image: string
}

interface IPokemonDetailProps {
  data: ResponseDetailPokemon,
  dataEvo: DataEvo[]
}

const PokemonDetail:FC<IPokemonDetailProps> = ({ data, dataEvo }) => {

  const { t } = useTranslation("common");

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
    <>
      <section>
        <Grid container spacing={2} alignItems="center">
          <Grid component="div" size={{ xs: 12, md: 5 }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '16px' }}>
              <Image
                src={data?.sprites?.front_default ?? ""}
                alt={data.name}
                width={300}
                height={300}
              />
            </div>
          </Grid>

          <Grid component="div" size={{ xs: 12, md: 7 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#42494D', fontSize: "2.5rem" }}>
              {capitalizeFirstLetter(data.name)}
            </Typography>
            <Grid direction="row" container spacing={1}>
              <Grid display="flex" alignItems="center" gap={4} direction="row" mt={3} size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: "1.25rem" }}>{t("lbl_weight")}:</Typography>
                <Typography>{data.weight}</Typography>
              </Grid>
              <Grid display="flex" alignItems="center" gap={4} direction="row" mt={3} size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: "1.25rem" }}>{t("lbl_height")}:</Typography>
                <Typography>{data.height}</Typography>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={6} mt={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, fontSize: "1.25rem" }}>{t("lbl_abilities")}:</Typography>
              <ul>
                {
                  data.abilities.map((x) => (
                    <li key={x.ability.name}>{x.ability.name} {x.is_hidden ? "(hidden)" : ""}</li>
                  ))
                }
              </ul>
            </Stack>
            <Grid direction="row" container spacing={1} alignItems="center" gap={{ xs: 0, md: 8 }}>
              <Stack direction="row" spacing={1} mt={1}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2, fontSize: "1.25rem" }}>{t("lbl_type")}:</Typography>
              </Stack>
              <Grid display="flex" alignItems="center" gap={2} direction="row" mt={3} size={{ xs: 12, md: 6 }}>
                {
                  data.types.map((x, idx) => (
                    <Link href={`/pokemon-type/${x.type.name}`} key={x.type.name}>
                      <Chip key={x.type.name} label={x.type.name} sx={{ backgroundColor: selectColor(idx, "types"), color: 'white', padding: "7px 25px", fontWeight: "bold", fontSize: "1.25rem" }} />
                    </Link>
                  ))
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </section>
      <Box
        mx="auto"
        maxWidth="1160px"
        display="flex"
        // alignItems="center"
        flexDirection="column"
        pt="30px"
      >
        <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold", color: "#42494D" }}>{t("lbl_other_images")} : </Typography>
        <div style={{ width: "100%", maxWidth: "1160px", overflowX: "auto", display: "flex", flexDirection: "row", gap: "25px", whiteSpace: "nowrap", marginTop: '20px' }}>
          {
            data.sprites.front_default && 
              <Image
                src={data.sprites.front_default}
                width={169}
                height={169}
                alt='not found'
              />
          }
          {
            data.sprites.back_female && 
              <Image
                src={data.sprites.back_female}
                width={169}
                height={169}
                alt='not found'
              />
          }
          {
            data.sprites.back_shiny && 
              <Image
                src={data.sprites.back_shiny}
                width={169}
                height={169}
                alt='not found'
              />
          }
          {
            data.sprites.back_shiny_female && 
              <Image
                src={data.sprites.back_shiny_female}
                width={169}
                height={169}
                alt='not found'
              />
          }
          {
            data.sprites.front_default && 
              <Image
                src={data.sprites.front_default}
                width={169}
                height={169}
                alt='not found'
              />
          }
          {
            data.sprites.front_female && 
              <Image
                src={data.sprites.front_female}
                width={169}
                height={169}
                alt='not found'
              />
          }
          {
            data.sprites.front_shiny && 
              <Image
                src={data.sprites.front_shiny}
                width={169}
                height={169}
                alt='not found'
              />
          }
          {
            data.sprites.front_shiny_female && 
              <Image
                src={data.sprites.front_shiny_female}
                width={169}
                height={169}
                alt='not found'
              />
          }
        </div>
      </Box>
      <Box
        mx="auto"
        maxWidth="1160px"
        display="flex"
        // alignItems="center"
        flexDirection="column"
        pt="30px"
      >
        <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold", color: "#42494D" }}>{t("lbl_stats")} : </Typography>
        <div style={{ width: "100%", maxWidth: "1160px", overflowX: "auto", display: "flex", flexDirection: "row", gap: "25px", whiteSpace: "nowrap", marginTop: '20px' }}>
          {data.stats.map((stat, idx) => (
            <Stats
              key={stat.stat.name}
              color={selectColor(idx, "stats")}
              stat={stat.stat.name}
              value={stat.base_stat}
            />
          ))}
        </div>
      </Box>
      <Box
        mx="auto"
        maxWidth="1160px"
        display="flex"
        // alignItems="center"
        flexDirection="column"
        pt="50px"
        pb="30px"
      >
        <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold", color: "#42494D" }}>{t("lbl_evolution")}: </Typography>
        <div style={{ width: "100%", maxWidth: "1160px", overflowX: "auto", display: "flex", flexDirection: "row", gap: "25px", whiteSpace: "nowrap", marginTop: '20px' }}>
          {dataEvo.map((evo, idx) => (
            <Link key={evo.name} href={`/${evo.name}`} style={{ textDecoration: "none" }}>
              <Evolution
                key={idx}
                color={selectColor(idx, "evolution")}
                imgSrc={evo.image}
                title={evo.name}
                isLast={idx === dataEvo.length - 1}
              />
            </Link>
          ))}
        </div>
      </Box>
    </>
  )
}

export default PokemonDetail
