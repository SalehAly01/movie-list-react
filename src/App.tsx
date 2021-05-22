import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Container, makeStyles, Typography } from "@material-ui/core";

import { AppHeader } from "components/app-header";
import { AllMovies } from "features/all-movies";
import { AddMovieModalContext } from "helpers/add-movie-modal-context";
import { AddMovieModal } from "features/all-movies/add-movie-modal";

const useStyles = makeStyles(() => ({
  root: { flexGrow: 1 },
  container: { padding: 50, textAlign: "center", overflow: "hidden" },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [isAddMovieModalOpen, setAddMovieModalOpen] = useState(false);

  return (
    <Router>
      <div className={classes.root}>
        <AddMovieModalContext.Provider
          value={{
            isModalOpen: isAddMovieModalOpen,
            setModalOpen: setAddMovieModalOpen,
          }}
        >
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
        </AddMovieModalContext.Provider>

        <AddMovieModal
          open={isAddMovieModalOpen}
          handleClose={() => setAddMovieModalOpen(false)}
        />
      </div>
    </Router>
  );
};

export default App;
