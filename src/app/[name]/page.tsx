import PokemonDetail from '@/components/pages/pokemonDetail'
import CONSTANT from '@/constant';
import React, { FC } from 'react'

interface IProductDetailProps {
  params: {
    name: string;
  };
}

interface DataEvo {
  name: string,
  image: string
}

interface EvolutionChain {
  species: {
    name: string;
  };
  evolves_to: EvolutionChain[];
}

const fetchPokemonDetails = async (pokemonName: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();
  return data.sprites.front_default; // Image URL
};

const fetchEvolutionChainWithImages = async (pokemonName: string) => {
  try {
    // Fetch species data to get the evolution chain URL
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    const speciesData = await speciesResponse.json();

    const evolutionChainUrl = speciesData.evolution_chain.url;

    // Fetch the evolution chain
    const evolutionResponse = await fetch(evolutionChainUrl);
    const evolutionData = await evolutionResponse.json();

    // Recursive function to flatten the evolution chain
    const getEvolutionFlatArray = async (chain: EvolutionChain) => {
      const pokemonName = chain.species.name;
      const imageUrl = await fetchPokemonDetails(pokemonName);

      const evolutionDetails = [
        {
          name: pokemonName,
          image: imageUrl,
        },
      ];

      // If there are further evolutions, flatten them and concatenate
      if (chain.evolves_to.length > 0) {
        for (const nextEvolution of chain.evolves_to) {
          const nextEvolutions = await getEvolutionFlatArray(nextEvolution);
          evolutionDetails.push(...nextEvolutions);
        }
      }

      return evolutionDetails;
    };

    // Start with the base evolution chain
    const evolutionFlatArray = await getEvolutionFlatArray(evolutionData.chain);

    return evolutionFlatArray;
  } catch (error) {
    console.error('Error fetching evolution chain with images:', error);
    return []
  }
};


// SSR implementation in Detail Pokemon
const PageDetail:FC<IProductDetailProps> = async ({ params }) => {
  const { name } = params;
  // get detail pokemon
  const res = await fetch(`${CONSTANT.BACKEND_URL}/pokemon/${name}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const dataEvo:DataEvo[] = await fetchEvolutionChainWithImages(data.name)

  return (
    <PokemonDetail
      data={data}
      dataEvo={dataEvo}
    />
  )
}

export default PageDetail
