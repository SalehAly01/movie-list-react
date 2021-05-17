import { GetMoviesresponse } from "types/movie-types";

export const fetchMovies = (page: number): Promise<GetMoviesresponse> =>
  fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=24579e4728fc129545d1627aa818d692`
  )
    .then((response) => response.json())
    .then((data) => data);
