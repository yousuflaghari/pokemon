// src/redux/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 10,
  data: [],
  names: [],
  score: 0,
  selectedPokemon: { name: "", url: "" },
  isLoading: false,
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
    setData: (state, action) => {
      state.data = action.payload;
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
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
