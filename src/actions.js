import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (limit = 20) => `pokemon/?limit=${limit}`,
      transformResponse: (response) => response.results,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
