/* eslint-disable camelcase */
import { GetMoviesresponse, Movie } from "types/movie-types";

export const fetchMovies = (page: number): Promise<GetMoviesresponse> =>
  fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=24579e4728fc129545d1627aa818d692`
  )
    .then((response) => response.json())
    .then((data) => data);

// fake promise to simulate posting a new movie to the API and receiving response
export const addNewMovie = (movie: {
  title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
}): Promise<Movie> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ ...movie, id: Math.random(), myMovies: true }),
      300
    )
  );
