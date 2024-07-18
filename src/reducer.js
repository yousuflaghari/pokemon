// src/redux/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchSelectedPokemon } from "./actions";

const initialState = {
  time: 10,
  names: [],
  score: 0,
  selectedPokemon: { name: "", url: "" },
  snackbarOpen: false,
  snackbarMessage: "",
  gameover: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },

    setNames: (state, action) => {
      state.names = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },

    setSnackbarOpen: (state, action) => {
      state.snackbarOpen = action.payload;
    },
    setSnackbarMessage: (state, action) => {
      state.snackbarMessage = action.payload;
    },
    setGameover: (state, action) => {
      state.gameover = action.payload;
    },
  },
});

export const {
  setTime,
  setData,
  setNames,
  setScore,
  setSelectedPokemon,
  setIsLoading,
  setSnackbarOpen,
  setSnackbarMessage,
  setGameover,
} = gameSlice.actions;

export default gameSlice.reducer;
