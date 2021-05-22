import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppSelector } from "helpers/hooks";
import { AddMovieModalContext } from "helpers/add-movie-modal-context";
import { MovieListItem } from "./movie-list-item";
import {
  getMoviesAsyncAction,
  selectAllMovies,
  selectMyMovies,
} from "./movies-slice";

import "react-circular-progressbar/dist/styles.css";

const useStyles = makeStyles({
  root: { flexGrow: 1 },
  loadingWrapper: {
    height: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    marginBottom: 30,
    backgroundColor: "#34495e",
    color: "#fff",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});

export const AllMovies: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { setModalOpen } = useContext(AddMovieModalContext);
  const movieList = useAppSelector((state) => selectAllMovies(state));
  const myMoviesList = useAppSelector((state) => selectMyMovies(state));
  const totalPages = useAppSelector((state) => state.movies.totalPages);
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const isLoading = useAppSelector(
    (state) => state.movies.status === "loading"
  );

  useEffect(() => {
    dispatch(getMoviesAsyncAction(1));
  }, [dispatch]);

  const fetchMore = () => dispatch(getMoviesAsyncAction(currentPage + 1));

  if (isLoading && !movieList.length) {
    return (
      <div className={classes.loadingWrapper}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.sectionTitle}>
        My Movies
      </Typography>

      {myMoviesList.length ? (
        <Grid container spacing={4}>
          {myMoviesList.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" component="p" style={{ marginBottom: 20 }}>
          You did not add movies yet, press
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
            style={{ margin: "0 10px" }}
          >
            Add Movie
          </Button>
          to start adding your list.
        </Typography>
      )}

      <InfiniteScroll
        dataLength={movieList.length}
        next={fetchMore}
        hasMore={currentPage < totalPages}
        loader={
          <div style={{ marginTop: 50 }}>
            <CircularProgress />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have reached the end.</b>
          </p>
        }
        style={{ overflow: "hidden" }}
      >
        <Typography
          variant="h4"
          component="h2"
          className={classes.sectionTitle}
        >
          All Movies
        </Typography>

        <Grid container spacing={4}>
          {movieList.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};
