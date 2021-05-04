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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TaskForm from "../tasks/TaskForm";
import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
}));

const TaskList = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
    deleteProject(actualProject._id);
  };

  const handleCloseSave = () => {
    setOpen(false);
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
          <Button
            variant="contained"
            size="large"
            className={classes.submit}
            startIcon={<AddRoundedIcon />}
            onClick={handleOpen}
          >
            Add task
          </Button>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">New Task</h2>
                <TaskForm onCloseModal={handleCloseSave} />
              </div>
            </Fade>
          </Modal>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="delete project"
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
