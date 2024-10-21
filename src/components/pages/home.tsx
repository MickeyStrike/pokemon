"use client"
import Pokemons from "@/assets/svg/Pokemons";
import { useDebounce, useMinimizedState } from "@/helper";
import PokeDexBg from "@/assets/image/PokeDexBg.png"
import CardPokemon from "../card";
import { CustomButton } from "../button";
import { Box, Button, FormControl, MenuItem, Pagination, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ModalPokemon from "../modalPokemon";
import { CustomSelect } from "../select";
import useFrontendServices from "@/services/frontend-services";
import { ResponseDetailPokemon } from "@/types";

interface IState {
  isModalOpen: boolean,
  limit: number,
  offset: number,
  totalData: number,
  listPokemon: ResponseDetailPokemon[],
  selectedPokemon: number,
}

const HomePage = () => {
  const { getListPokemon, getDetailPokemon } = useFrontendServices()

  const [state, dispatch] = useMinimizedState<IState>({
    isModalOpen: false,
    limit: 10,
    offset: 0,
    totalData: 0,
    listPokemon: [],
    selectedPokemon: 0
  })

  useDebounce((limit, offset) => {
    getListPokemon({ limit: limit, offset: offset })
      .then((res) => {
        dispatch({ totalData: res.data.count })
        const detailServices = res.data.results.map((x) => {
          return getDetailPokemon(x.name)
        })
        Promise.all(detailServices)
          .then((results) => {
            const dataList = results.map((x) => x.data)
            dispatch({ listPokemon: dataList })
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }, [state.limit, state.offset])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset sebesar -100px
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <section style={{ minHeight: '100vh' }}>
        <Box
          mx="auto"
          maxWidth="1160px"
          display="flex"
          alignItems="center"
          gap="92px"
          pt="30px"
        >
          <Box display="flex" flexDirection="column">
            <Box sx={{ maxWidth: "490px" }}>
              <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', fontSize: '3.25rem', lineHeight: '78px', color: '#42494D' }}>
                {"All the Pokémon data you'll ever need in one place!"}
              </Typography>
              <Typography variant="h3" component="h3" sx={{ mt: 4, color: '#7B8082', fontSize: '1.25rem' }}>
                Thousands of data compiled into one place
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <CustomButton
                sx={{ background: "#E6AB09", color: 'white' }}
                onClick={() => scrollToSection("pokedex")}
              >
                Check PokèDex
              </CustomButton>
            </Box>
          </Box>
          <Pokemons />
        </Box>
      </section>

      <section
        style={{
          backgroundImage: `url(${PokeDexBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '80px 0',
          position: 'relative',
        }}
      >
        <Box mx="auto" maxWidth="1160px" zIndex={10} position="relative">
          <Typography variant="h1" component="h1" sx={{ textAlign: 'center', fontSize: '2.5rem', color: '#42494D', fontWeight: 'bold' }} id="pokedex">
            PokèDex
          </Typography>
          <Typography variant="h2" component="h2" sx={{ textAlign: 'center', fontSize: '1.5rem', color: '#42494D', marginTop: 2, lineHeight: '2.25rem', fontWeight: "500" }}>
            All Generation totaling <br /> {state.totalData} Pokemon
          </Typography>
        </Box>

        <Box mx="auto" mt={10} maxWidth="1160px">
          <Grid container spacing={2}>
            {state.listPokemon.map((data, index) => (
              <Grid 
                size={{ 
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
                component="div"
                key={index}
              >
                <Button onClick={() => dispatch({ isModalOpen: true, selectedPokemon: index })}>
                  <CardPokemon
                    data={data}
                  />
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Grid mx="auto" container maxWidth="1160px" zIndex={10} display="flex" alignItems="center" justifyContent="space-between" sx={{ marginTop: "30px" }}>
          <Grid sx={{ minWidth: 120 }} spacing={6}>
            <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
              <Typography sx={{ color: "white", fontWeight: "bold" }}>Per Page:</Typography>
              <CustomSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.limit}
                className="padding-select"
                sx={{ marginLeft: "10px" }}
                // label="Per Page :"
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
            className="custom-pagination"
            onChange={(_e, page) => dispatch({ offset: page - 1 })}
          />
          <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "1.25rem", marginRight: "50px" }}>
            Total Data : {state.totalData}
          </Typography>
        </Grid>
      </section>
      <ModalPokemon
        visible={state.isModalOpen}
        handleClose={() => dispatch({ isModalOpen: false })}
        data={state?.listPokemon?.[state.selectedPokemon]}
      />
    </>
  );
}

export default HomePage
