import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie } from "types/movie-types";
import { RootState } from "types/store-types";
import { fetchMovies } from "./get-movies-api";

export interface MoviesState {
  collection: Movie[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
  status: "idle" | "loading" | "failed";
}

const initialState: MoviesState = {
  collection: [],
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
        // eslint-disable-next-line camelcase
        const { results, page, total_pages, total_results } = action.payload;

        return {
          ...state,
          status: "idle",
          currentPage: page,
          totalPages: total_pages,
          totalResults: total_results,
          collection: [...state.collection, ...results],
        };
      });
  },
});

export const selectMovies = (state: RootState): Movie[] =>
  state.movies.collection;

export default moviesSlice.reducer;
