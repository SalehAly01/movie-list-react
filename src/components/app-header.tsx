import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Button,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AddMovieModalContext } from "helpers/add-movie-modal-context";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 30px",
  },
  title: {
    textDecoration: "none",
    color: "#fff",
    minWidth: 160,
    display: "block",
  },
  toolBar: { flex: 1, display: "flex", justifyContent: "space-between" },
  tabs: { height: 54, marginTop: 10 },
}));

export const AppHeader: React.FC = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { setModalOpen } = useContext(AddMovieModalContext);

  return (
    <AppBar position="sticky" className={classes.header}>
      <Typography component="h1">
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className={classes.title}
        >
          Movies Directory
        </Typography>
      </Typography>

      <Toolbar className={classes.toolBar}>
        <Tabs variant="standard" value={pathname} className={classes.tabs}>
          <Tab
            component={Link}
            label="Home"
            to="/all-movies"
            value="/all-movies"
          />
        </Tabs>

        <Button
          variant="contained"
          style={{ minWidth: 110, marginLeft: 10 }}
          onClick={() => setModalOpen(true)}
        >
          Add Movie
        </Button>
      </Toolbar>
    </AppBar>
  );
};
