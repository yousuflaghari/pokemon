// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./actions";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
