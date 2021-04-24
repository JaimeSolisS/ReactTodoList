import React, { Fragment, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Grid from "@material-ui/core/Grid";

import projectContext from "../../context/projects/projectContext";

const useStyles = makeStyles((theme) => ({
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

const NewProject = () => {
  const classes = useStyles();

  //Form State
  const projectsContext = useContext(projectContext);
  const {
    newProjectFormSt,
    errorFormSt,
    showForm,
    addProject,
    showError,
  } = projectsContext;

  //Project State
  const [project, setProject] = useState({
    name: "",
  });

  //Get project name
  const { name } = project;

  //Get input value
  const onChangeProject = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
    //console.log(project.name);
  };

  //New Project
  const onSubmitProject = (e) => {
    e.preventDefault();

    //validate
    if (name === "") {
      showError();
      return;
    }

    //add to state
    addProject(project);

    //empty form
    setProject({
      name: "",
    });
  };

  //Show Form
  const onClickForm = () => {
    showForm();
  };

  return (
    <Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <IconButton
            className={classes.complete}
            type="button"
            onClick={onClickForm}
          >
            <AddRoundedIcon fontSize="large" />
          </IconButton>
        </Grid>

        {newProjectFormSt ? (
          <form onSubmit={onSubmitProject}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <TextField
                  variant="standard"
                  margin="normal"
                  label="Project Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  color="secondary"
                  id="name"
                  value={name}
                  onChange={onChangeProject}
                  helperText={errorFormSt ? "Please enter a project name!" : ""}
                  error={!!errorFormSt}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Add Project
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : null}
      </Grid>
    </Fragment>
  );
};

export default NewProject;
