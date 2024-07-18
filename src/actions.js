import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: () => `pokemon/?limit=20`,
      transformResponse: (response) => response.results,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
