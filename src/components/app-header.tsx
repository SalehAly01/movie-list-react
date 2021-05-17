import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 30,
    textDecoration: "none",
    color: "#fff",
  },
  tabs: { height: 54, marginTop: 10 },
}));

export const AppHeader: React.FC = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <AppBar position="sticky">
      <Toolbar>
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

        <Tabs variant="standard" value={pathname} className={classes.tabs}>
          <Tab
            component={Link}
            label="Home"
            to="/all-movies"
            value="/all-movies"
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};
