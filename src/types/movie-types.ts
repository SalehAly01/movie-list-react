/* eslint-disable camelcase */
export interface Movie {
  id: number;
  overview: string;
  poster_path?: string;
  release_date: string;
  title: string;
  vote_average?: number;
  myMovies?: boolean;
}

export interface GetMoviesresponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
