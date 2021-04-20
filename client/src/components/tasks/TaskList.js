import React, { Fragment, useContext } from "react";
import Task from "./Task";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

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
      <Container>
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
            {tasksProjectSt.length === 0 ? (
              <Typography variant="h4" gutterBottom>
                There are no tasks to do
              </Typography>
            ) : (
              tasksProjectSt.map((task) => <Task key={task.id} task={task} />)
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
      </Container>
    </Fragment>
  );
};

export default TaskList;
