import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import taskContext from "../../context/tasks/taskContext";
import projectContext from "../../context/projects/projectContext";
import IconButton from "@material-ui/core/IconButton";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: "20px",
  },
  complete: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.light,
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
    color:
      theme.palette.type === "dark"
        ? theme.palette.secondary.main
        : theme.palette.secondary.light,
  },
  delete: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.delete.main
        : theme.palette.delete.light,
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
}));

const Task = ({ task }) => {
  //Extract if a project is selected
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  //Tasks
  const tasksContext = useContext(taskContext);
  const { deleteTask, getTasks, changeStatusTask, editTask } = tasksContext;

  const [actualProject] = project;

  //Delete Button
  const deleteTaskFn = (id) => {
    deleteTask(id);
    getTasks(actualProject.id);
  };

  //Edit Task
  const selectTask = (task) => {
    editTask(task);
  };

  const changeStatus = (task) => {
    if (task.status) task.status = false;
    else task.status = true;

    changeStatusTask(task);
  };

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between" alignItems="center" spacing={1}>
        <Grid item>
          {" "}
          {task.status ? (
            //Complete
            <IconButton
              className={classes.complete}
              type="submit"
              onClick={() => changeStatus(task)}
            >
              <CheckCircleRoundedIcon fontSize="large" />
            </IconButton>
          ) : (
            //Uncomplete
            <IconButton type="submit" onClick={() => changeStatus(task)}>
              <RadioButtonUncheckedRoundedIcon fontSize="large" />
            </IconButton>
          )}{" "}
        </Grid>{" "}
        <Grid item xs>
          <Typography variant="subtitle1"> {task.name} </Typography>{" "}
          <Typography variant="body2" color="textSecondary">
            {" "}
            {task.date}{" "}
          </Typography>{" "}
        </Grid>{" "}
        <Grid item>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <IconButton
                aria-label="delete"
                type="submit"
                className={classes.edit}
                onClick={() => selectTask(task)}
              >
                <CreateRoundedIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="delete"
                type="submit"
                className={classes.delete}
                onClick={() => deleteTaskFn(task.id)}
              >
                <DeleteRoundedIcon fontSize="large" />
              </IconButton>
            </Grid>{" "}
          </Grid>{" "}
        </Grid>{" "}
      </Grid>{" "}
    </Paper>
  );
};

export default Task;
