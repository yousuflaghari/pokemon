// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducer";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
