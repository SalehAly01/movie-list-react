import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import moviesReducer from "features/all-movies/movies-slice";

const logger = createLogger({ collapsed: true });
const isDevelopment = process.env.NODE_ENV === "development";
const customMiddelware = isDevelopment ? [logger] : [];

export const store = configureStore({
  reducer: { movies: moviesReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddelware),
  devTools: isDevelopment,
});

export type storeDispatch = typeof store.dispatch;
export type storeGetState = typeof store.getState;
