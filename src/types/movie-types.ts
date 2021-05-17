/* eslint-disable camelcase */
export interface Movie {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  adult: boolean;
}

export interface GetMoviesresponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
