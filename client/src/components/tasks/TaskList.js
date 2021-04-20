import React, { Fragment, useContext } from "react";
import Task from "./Task";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";
import IconButton from "@material-ui/core/IconButton";

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
    margin: theme.spacing(5),
  },
}));

const TaskList = () => {
  const classes = useStyles();
  //Get projects from state
  const projectsContext = useContext(projectContext);
  const { project, deleteProject } = projectsContext;

  //Get project's tasks
  const tasksContext = useContext(taskContext);
  const { tasksProjectSt } = tasksContext;

  // If there's no selected project
  if (!project)
    return (
      <Container>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h3" gutterBottom>
              Select a Project
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );

  //extract selected project -->Error when there's no selected project
  const [actualProject] = project;

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
          <Grid item>
            <Typography variant="h3" gutterBottom>
              {actualProject.name}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={10}>
          {tasksProjectSt.length === 0 ? (
            <Typography variant="h4" gutterBottom>
              There are no tasks to do
            </Typography>
          ) : (
            tasksProjectSt.map((task) => <Task key={task.id} task={task} />)
          )}
        </Grid>
        <Grid item>
          <IconButton
            aria-label="delete"
            type="submit"
            className={classes.delete}
            onClick={onClickDelete}
          >
            <DeleteForeverRoundedIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default TaskList;
