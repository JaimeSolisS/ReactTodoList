import React, { Fragment, useContext } from "react";
import Task from "./Task";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import projectContext from "../../context/projects/projectContext";

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
  //Get projects from state
  const projectsContext = useContext(projectContext);
  const { project, deleteProject } = projectsContext;

  // If there's no selected project
  if (!project)
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Select a Project
          </Typography>
        </Grid>
      </Grid>
    );

  //extract selected project -->Error when there's no selected project
  const [actualProject] = project;

  const tasks = [
    { name: "Task 1", date: "Mon 19 Apr", status: true },
    { name: "Task 2", date: "Tue 20 Apr", status: true },
    { name: "Task 3", date: "Tue 20 Apr", status: true },
    { name: "Task 4", date: "Tue 20 Apr", status: false },
    { name: "Task 5", date: "Tue 20 Apr", status: false },
  ];

  const onClickDelete = () => {
    deleteProject(actualProject.id);
  };

  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {actualProject.name}
          </Typography>
        </Grid>

        <Grid item xs={10}>
          {tasks.length === 0 ? (
            <Typography variant="h4" gutterBottom>
              There are no tasks to do
            </Typography>
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
            startIcon={<DeleteForeverRoundedIcon />}
            onClick={onClickDelete}
          >
            Delete Project
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default TaskList;
