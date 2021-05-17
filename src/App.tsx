import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Container, makeStyles, Typography } from "@material-ui/core";

import { AppHeader } from "components/app-header";
import { AllMovies } from "features/all-movies";

const useStyles = makeStyles(() => ({
  root: { flexGrow: 1 },
  container: { padding: 50, textAlign: "center", overflow: "hidden" },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppHeader />

        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Redirect exact from="/" to="/all-movies" />

            <Route exact path="/all-movies">
              <AllMovies />
            </Route>

            <Route>
              <Typography variant="h3">404</Typography>
              <Typography variant="overline">Not Found</Typography>
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
