import { ResponseListPokemonByType } from "@/types/pokemonType";
import useFrontendInstance from "./instance";

import {
  ResponsePokemonList,
  IParamsGetListPokemon,
  ResponseDetailPokemon,
  ResponseListPokemonType
} from "@/types";

const useFrontendServices = () => {
  const instance = useFrontendInstance();

  return {
    getListPokemon: (params: IParamsGetListPokemon) =>
      instance.get<ResponsePokemonList>(
        `/pokemon`, { params }
      ),
    getDetailPokemon: (name: string) =>
      instance.get<ResponseDetailPokemon>(
        `/pokemon/${name}`
      ),
    getListPokemonType: () =>
      instance.get<ResponseListPokemonType>(
        `https://pokeapi.co/api/v2/type/`
      ),
    getListPokemonByType: (idType: number) =>
      instance.get<ResponseListPokemonByType>(
        `https://pokeapi.co/api/v2/type/${idType}`
      ),
  };
};

export default useFrontendServices;
