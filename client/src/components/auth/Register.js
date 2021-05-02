import React, { useContext, useState } from "react";
import { Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

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
  //get context
  const alertContext = useContext(AlertContext);
  const {
    alertUserSt,
    alertEmailSt,
    alertPasswordSt,
    showAlertUser,
    hideAlertUser,
    showAlertEmail,
    hideAlertEmail,
    showAlertPassword,
    hideAlertPassword,
  } = alertContext;

  const authContext = useContext(AuthContext);
  const { registerUser } = authContext;

  const classes = useStyles();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    hideAlertUser();
    hideAlertEmail();
    hideAlertPassword();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //empty field validation
    if (name === "") {
      showAlertUser("Username is required!");
      return;
    }

    //empty email vailidation
    if (email === "") {
      showAlertEmail("Email is required!");
      return;
    }

    //simple valid email validation
    var regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      showAlertEmail("Please use a valid email address");
      return;
    }
    //empty passowrd validation
    if (password === "") {
      showAlertPassword("Password is required!");
      return;
    }

    //8 characters, at least 1 uppercase, 1 lowercase and 1 special character
    regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]{8,}/;
    if (!regex.test(password)) {
      showAlertPassword(
        "Please enter a password with at least 8 characters including at least one uppercase letter, one lower case letter and one number"
      );
      return;
    }

    //PASS
    registerUser({
      name,
      email,
      password,
    });
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
              fullWidth
              id="name"
              value={name}
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              color="secondary"
              onChange={onChange}
              helperText={alertUserSt ? `${alertUserSt}` : ""}
              error={!!alertUserSt}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              value={email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="secondary"
              onChange={onChange}
              helperText={alertEmailSt ? `${alertEmailSt}` : ""}
              error={!!alertEmailSt}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              value={password}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              onChange={onChange}
              helperText={alertPasswordSt ? `${alertPasswordSt}` : ""}
              error={!!alertPasswordSt}
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
