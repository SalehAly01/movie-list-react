/* eslint-disable camelcase */
import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import { Movie } from "types/movie-types";
import "react-circular-progressbar/dist/styles.css";

const useStyles = makeStyles({
  card: { maxWidth: 220, height: "100%", margin: "0 auto" },
  media: { height: 330, marginBottom: 12 },
  ratingWrapper: {
    width: 45,
    height: 45,
    position: "absolute",
    top: 305,
    left: 10,
  },
});
export const MovieListItem: React.FC<{ movie: Movie }> = ({ movie }) => {
  const classes = useStyles();
  const { id, title, poster_path, vote_average, release_date, myMovies } =
    movie;
  const getPoster = () => {
    if (poster_path) {
      return myMovies
        ? `${poster_path}`
        : `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`;
    }

    return "https://www.virginmediastore.com/media/tile-placeholder-poster.2769cb5f.png";
  };

  return (
    <Grid item xs={12} md={3} sm={4} key={id}>
      <Card
        className={classes.card}
        onClick={() =>
          !myMovies && window.open(`https://www.themoviedb.org/movie/${id}`)
        }
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={getPoster()}
            title={title}
          />

          {vote_average && (
            <div className={classes.ratingWrapper}>
              <CircularProgressbar
                value={vote_average}
                maxValue={10}
                text={`${vote_average}`}
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
          )}

          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h2"
              align="left"
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              {release_date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
