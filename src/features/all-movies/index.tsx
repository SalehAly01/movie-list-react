import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppSelector } from "helpers/hooks";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { getMoviesAsyncAction, selectMovies } from "./movies-slice";

import "react-circular-progressbar/dist/styles.css";

const useStyles = makeStyles({
  root: { flexGrow: 1 },
  sectionTitle: {
    marginBottom: 30,
    backgroundColor: "#34495e",
    color: "#fff",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: { maxWidth: 220, height: "100%", margin: "0 auto" },
  media: { height: 330, marginBottom: 12 },
});

export const AllMovies: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const movieList = useAppSelector((state) => selectMovies(state));
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
      <div
        style={{
          height: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <InfiniteScroll
        dataLength={movieList.length} // This is important field to render the next data
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
            <Grid item xs={12} md={3} sm={4} key={movie.id}>
              <Card
                className={classes.card}
                onClick={() =>
                  window.open(`https://www.themoviedb.org/movie/${movie.id}`)
                }
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                    title={movie.title}
                  />

                  <div
                    style={{
                      width: 45,
                      height: 45,
                      position: "absolute",
                      top: 305,
                      left: 10,
                    }}
                  >
                    <CircularProgressbar
                      value={movie.vote_average}
                      maxValue={10}
                      text={`${movie.vote_average}`}
                      background
                      backgroundPadding={5}
                      styles={buildStyles({
                        backgroundColor: "#081C22",
                        textColor: "#fff",
                        pathColor: "#1FBF70",
                        trailColor: "transparent",
                        textSize: 36,
                      })}
                    />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="h2"
                      align="left"
                    >
                      {movie.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      {movie.release_date}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};
