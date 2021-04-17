import React, { Fragment } from "react";
import Task from "./Task";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
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

const TaskList = () => {
  const classes = useStyles();
  const tasks = [
    { name: "Task 1", date: "Mon 19 Apr", status: true },
    { name: "Task 2", date: "Tue 20 Apr", status: true },
    { name: "Task 3", date: "Tue 20 Apr", status: true },
    { name: "Task 4", date: "Tue 20 Apr", status: false },
    { name: "Task 5", date: "Tue 20 Apr", status: false },
  ];
  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <h2 style={{ margin: "0px" }}>Project: Name</h2>
        </Grid>

        <Grid item xs={10}>
          {tasks.length === 0 ? (
            <li>There are no tasks to do</li>
          ) : (
            tasks.map((task) => <Task task={task} />)
          )}
        </Grid>
        <Grid item>
          <Button
            fullWidth
            type="submit"
            size="small"
            variant="contained"
            className={classes.delete}
          >
            Delete Project
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default TaskList;
