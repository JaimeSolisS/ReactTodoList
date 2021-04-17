import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: "20px",
  },
  complete: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.complete.main
        : theme.palette.complete.light,
    color:
      theme.palette.type === "dark"
        ? theme.palette.text.main
        : theme.palette.text.light,
  },
  incomplete: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.incomplete.main
        : theme.palette.incomplete.light,
    color:
      theme.palette.type === "dark"
        ? theme.palette.text.main
        : theme.palette.text.light,
  },
  edit: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.secondary.main
        : theme.palette.secondary.light,
    color:
      theme.palette.type === "dark"
        ? theme.palette.text.main
        : theme.palette.text.light,
  },
  delete: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.delete.main
        : theme.palette.delete.light,
    color:
      theme.palette.type === "dark"
        ? theme.palette.text.main
        : theme.palette.text.light,
  },
}));

const Task = ({ task }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between" alignItems="center" spacing={5}>
        <Grid item xs direction="collumn">
          <Typography variant="subtitle1">{task.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {task.date}
          </Typography>
        </Grid>
        <Grid item>
          {task.status ? (
            <Button
              fullWidth
              type="submit"
              size="small"
              variant="contained"
              className={classes.complete}
            >
              Complete
            </Button>
          ) : (
            <Button
              fullWidth
              type="submit"
              size="small"
              variant="contained"
              className={classes.incomplete}
            >
              Incomplete
            </Button>
          )}
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Button
                fullWidth
                type="submit"
                size="small"
                variant="contained"
                className={classes.edit}
              >
                Edit
              </Button>
            </Grid>

            <Grid item>
              <Button
                fullWidth
                type="submit"
                size="small"
                variant="contained"
                className={classes.delete}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Task;
