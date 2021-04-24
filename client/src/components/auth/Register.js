import React, { useState } from "react";
import { Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 70,
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.light,
  },
  textField: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.secondary.main
        : theme.palette.secondary.light,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background:
      theme.palette.type === "dark"
        ? theme.palette.secondary.main
        : theme.palette.secondary.light,
    color:
      theme.palette.type === "dark"
        ? theme.palette.text.main
        : theme.palette.text.light,
  },
  grid: {
    height: "80vh",
  },
}));

const Register = () => {
  const classes = useStyles();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.grid}
      >
        <Grid item>
          <Avatar className={classes.avatar}>
            <CheckRoundedIcon className={classes.icon} />
          </Avatar>
        </Grid>

        <Grid item>
          <Typography variant="h3" gutterBottom>
            Sign Up
          </Typography>
        </Grid>

        <Grid item>
          <form onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              value={username}
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              color="secondary"
              onChange={onChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="secondary"
              onChange={onChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              value={password}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              onChange={onChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign up
            </Button>
          </form>
        </Grid>
        <Grid item>
          <Link to="/" className={classes.textField}>
            {" "}
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
