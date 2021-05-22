import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, makeStyles, Modal, TextField } from "@material-ui/core";

import { addMovieAsyncAction } from "./movies-slice";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  field: { marginBottom: 20 },
}));

const readURL = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
};

export const AddMovieModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalStyle] = useState(getModalStyle);
  const [title, setTitle] = useState<string>("");
  const [overview, setOverview] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [poster, setPoster] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && overview && releaseDate) {
      dispatch(
        addMovieAsyncAction({
          title,
          overview,
          release_date: releaseDate,
          poster_path: poster,
        })
      );

      handleClose();
      setTitle("");
      setOverview("");
      setReleaseDate("");
      setPoster("");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        <h2>Add New Movie</h2>

        <form autoComplete="off" onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              required
              id="outlined-required"
              label="Movie Title"
              variant="standard"
              className={classes.field}
              value={title}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setTitle(event.target.value)}
            />

            <TextField
              required
              id="outlined-required"
              label="Movie Overview"
              variant="standard"
              className={classes.field}
              value={overview}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setOverview(event.target.value)}
            />

            <TextField
              required
              id="date"
              label="Release Date"
              type="date"
              variant="standard"
              className={classes.field}
              InputLabelProps={{ shrink: true }}
              value={releaseDate}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setReleaseDate(event.target.value)}
            />

            <input
              type="file"
              onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files[0];
                const url = await readURL(file);
                setPoster(url as string);
              }}
              id="myFile"
              name="filename"
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: 50 }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
