"use client"
import { Box, FormControl, MenuItem, Pagination, Typography } from '@mui/material';
import React from 'react'
import Grid from '@mui/material/Grid2';
import NestedList from '../nestedList';
import TablePokemon from '../tablePokemon';
import { capitalizeFirstLetter, useDebounce, useMinimizedState } from '@/helper';
import useFrontendServices from '@/services/frontend-services';
import { ResponseDetailPokemon, Result } from '@/types';
import { Pokemon } from '@/types/pokemonType';
import { CustomSelect } from '../select';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface Params {
  [key: string]: string | string[];
}

interface IState {
  limit:                    number;
  offset:                   number;
  totalData:                number;
  listPokemon:              Pokemon[];
  listCompletedPokemon:     ResponseDetailPokemon[];
  listPokemonType:          Result[];
  selectedType:             string;
  selectedColor:            "blue" | "purple" | "red";
  idType:                   number;
}

const themeColor = {
  blue: {
    color: "#0779B0",
    background: "bg-blue-theme",
    select: "select-blue-theme",
    pagination: "pagination-blue-theme",
  },
  red: {
    color: "#F73B3B",
    background: "bg-red-theme",
    select: "select-red-theme",
    pagination: "pagination-red-theme",
  },
  purple: {
    color: "#434DD0",
    background: "bg-purple-theme",
    select: "select-purple-theme",
    pagination: "pagination-purple-theme"
  }
}

const PokemonType = () => {
  const params = useParams()
  const router = useRouter()
  const { t } = useTranslation("common")

  const { getListPokemonType, getListPokemonByType, getDetailPokemon } = useFrontendServices()
  const [state, dispatch] = useMinimizedState<IState>({
    limit: 10,
    offset: 1,
    totalData: 0,
    listPokemon: [],
    listCompletedPokemon: [],
    listPokemonType: [],
    selectedType: "",
    selectedColor: "blue",
    idType: 1,
  })

  useDebounce((params: Params, listPokemonType: Result[]) => {
    if (listPokemonType && listPokemonType.some((x) => x.name === params.pokemonType)) {
      dispatch({
        selectedType: params.pokemonType as string,
        idType: listPokemonType.findIndex((x) => x.name === params.pokemonType) + 1
      })
    }
    console.log(params.pokemonType, "ini params")
  }, [params, state.listPokemonType])

  useDebounce(() => {
    getListPokemonType()
      .then((res) => {
        dispatch({
          listPokemonType: res.data.results,
          selectedType: res.data.results[0].name
        })
      })
      .catch((err) => console.log(err))
  }, [])

  const themeSelector = (num: number) => {
    if (num % 3 === 0) return "purple"
    else if (num % 2 === 0) return "red"
    else return "blue"
  }

  useDebounce((idType) => {
    getListPokemonByType(idType)
      .then(({ data }) => {
        dispatch({
          listPokemon: data.pokemon,
          totalData: data.pokemon.length,
          selectedColor: themeSelector(idType)
        })
      })
      .catch((err) => console.log(err))
  }, [state.idType])

  const getPaginatedData = (offset: number, limit: number) => {
    const startIndex = (offset - 1) * limit;
    const endIndex = offset * limit;
  
    return {
      startIndex: startIndex + 1,
      endIndex
    };
  };

  useDebounce((offset: number, limit: number, listPokemon: Pokemon[]) => {
    const paginated = getPaginatedData(offset as number, limit as number)

    const filtered = listPokemon.filter((_x, idx) => idx >= paginated.startIndex && idx <= paginated.endIndex)
    const tempPromise = filtered.map((x) => getDetailPokemon(x.pokemon.name))
    Promise.all(tempPromise)
      .then((res) => {
        const results = res.map((x) => x.data)
        dispatch({ listCompletedPokemon: results })
      })
      .catch((err) => console.log(err))
    console.log(filtered, "filtered")

  }, [state.offset, state.limit, state.listPokemon])

  return (
    <div className={themeColor[state.selectedColor].background}>
      <Grid container spacing={2} sx={{ maxWidth: "1160px", margin: "auto", marginTop: "90px" }}>
        <Grid
          size={{ xs: 3 }}
          component="div"
        >
          <NestedList
            data={state.listPokemonType}
            selectedType={state.selectedType}
            color={themeColor[state.selectedColor].color}
            // changeType={(type) => dispatch({ selectedType: type, idType: state.listPokemonType.findIndex((x) => x.name === type) + 1 })}
            changeType={(type) => { router.push(`/pokemon-type/${type}`) }}
          />
        </Grid>
        <Grid
          size={{ xs: 1 }}
          component="div"
        >
          <div style={{ border: "0.5px solid #ECEDED", height: "540px", width: "1px" }}></div>
        </Grid>
        <Grid
          size={{ xs: 8 }}
          component="div"
        >
          <Box
            mx="auto"
            maxWidth="1160px"
            display="flex"
            flexDirection="column"
            pt="30px"
          >
            <Typography sx={{ fontSize: "2.5rem", fontWeight: "bold", color: "#42494D" }}>{t("lbl_pokemon_with_type")} {capitalizeFirstLetter(state.selectedType)}</Typography>
            <TablePokemon listPokemon={state.listCompletedPokemon} />
            {/* pagination section */}
            <Grid mx="auto" container zIndex={10} display="flex" alignItems="center" justifyContent="space-between" sx={{ marginTop: "30px", marginBottom: "30px", width: "100%" }}>
              <Grid sx={{ minWidth: 120 }} spacing={6}>
                <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                  <Typography sx={{ color: themeColor[state.selectedColor].color, fontWeight: "bold", fontSize: "1rem" }}>Per Page:</Typography>
                  <CustomSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.limit}
                    className={themeColor[state.selectedColor].select}
                    sx={{ marginLeft: "10px" }}
                    onChange={(evt) => dispatch({ limit: Number(evt.target.value) })}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </CustomSelect>
                </FormControl>
              </Grid>

              <Pagination
                count={Math.floor(state.totalData / state.limit)}
                variant="outlined"
                shape="rounded"
                className={themeColor[state.selectedColor].pagination}
                onChange={(_e, page) => dispatch({ offset: page })}
              />
              <Typography sx={{ color: themeColor[state.selectedColor].color, fontWeight: "bold", fontSize: "1rem" }}>
                Total Data : {state.totalData}
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default PokemonType;
