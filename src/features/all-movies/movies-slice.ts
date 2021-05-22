/* eslint-disable camelcase */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie } from "types/movie-types";
import { RootState } from "types/store-types";
import { addNewMovie, fetchMovies } from "./movies-api";

export interface MoviesState {
  collection: Movie[];
  myMovies: Movie[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
  status: "idle" | "loading" | "failed";
}

const initialState: MoviesState = {
  collection: [],
  myMovies: [],
  currentPage: 1,
  totalPages: 1,
  totalResults: 20,
  status: "idle",
};

export const getMoviesAsyncAction = createAsyncThunk(
  "movies/fetchMovies",
  async (page: number) => {
    const response = await fetchMovies(page);
    return response;
  }
);

export const addMovieAsyncAction = createAsyncThunk(
  "movies/addMovie",
  async (data: {
    title: string;
    overview: string;
    release_date: string;
    poster_path?: string;
  }) => {
    const response = await addNewMovie(data);
    return response;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesAsyncAction.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(getMoviesAsyncAction.fulfilled, (state, action) => {
        const { results, page, total_pages, total_results } = action.payload;

        return {
          ...state,
          status: "idle",
          currentPage: page,
          totalPages: total_pages,
          totalResults: total_results,
          collection: [...state.collection, ...results],
        };
      })
      .addCase(addMovieAsyncAction.fulfilled, (state, action) => {
        const { payload } = action;

        return {
          ...state,
          myMovies: [...state.myMovies, payload],
        };
      });
  },
});

export const selectAllMovies = (state: RootState): Movie[] =>
  state.movies.collection;

export const selectMyMovies = (state: RootState): Movie[] =>
  state.movies.myMovies;

export default moviesSlice.reducer;
