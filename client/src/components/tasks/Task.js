import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import taskContext from "../../context/tasks/taskContext";
import projectContext from "../../context/projects/projectContext";

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
      <Grid container justify="space-between" alignItems="center" spacing={5}>
        <Grid item xs>
          <Typography variant="subtitle1"> {task.name} </Typography>{" "}
          <Typography variant="body2" color="textSecondary">
            {" "}
            {task.date}{" "}
          </Typography>{" "}
        </Grid>{" "}
        <Grid item>
          {" "}
          {task.status ? (
            <Button
              fullWidth
              type="submit"
              size="small"
              variant="contained"
              className={classes.complete}
              style={{ textTransform: "none" }}
              endIcon={<CheckCircleOutlineRoundedIcon />}
              onClick={() => changeStatus(task)}
            >
              <Typography variant="subtitle2"> Complete </Typography>{" "}
            </Button>
          ) : (
            <Button
              fullWidth
              type="submit"
              size="small"
              variant="contained"
              className={classes.incomplete}
              style={{ textTransform: "none" }}
              endIcon={<HighlightOffRoundedIcon />}
              onClick={() => changeStatus(task)}
            >
              <Typography variant="subtitle2"> Incomplete </Typography>{" "}
            </Button>
          )}{" "}
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
              <Button
                fullWidth
                type="submit"
                size="small"
                variant="contained"
                className={classes.edit}
                startIcon={<CreateRoundedIcon />}
                onClick={() => selectTask(task)}
              >
                Edit{" "}
              </Button>{" "}
            </Grid>
            <Grid item>
              <Button
                fullWidth
                type="submit"
                size="small"
                variant="contained"
                className={classes.delete}
                startIcon={<DeleteRoundedIcon />}
                onClick={() => deleteTaskFn(task.id)}
              >
                Delete{" "}
              </Button>{" "}
            </Grid>{" "}
          </Grid>{" "}
        </Grid>{" "}
      </Grid>{" "}
    </Paper>
  );
};

export default Task;
