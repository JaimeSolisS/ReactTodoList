import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Button from "@material-ui/core/Button";

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
  },
}));

const Login = () => {
  const classes = useStyles();
  const onChangeLogin = () => {};
  return (
    <div className="container">
      <div className="container-form">
        <Avatar className={classes.avatar}>
          <CheckRoundedIcon className={classes.icon} />
        </Avatar>
        <h1>Log in</h1>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color="secondary"
            onChange={onChangeLogin}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color="secondary"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
