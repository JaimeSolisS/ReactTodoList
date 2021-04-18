import React, { Fragment, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

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
  const { newProjectFormSt, showForm, addProject } = projectsContext;

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
      <Button
        type="button"
        size="small"
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={onClickForm}
      >
        New Project
      </Button>

      {newProjectFormSt ? (
        <form className="center-column" onSubmit={onSubmitProject}>
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
          />
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Add Project
          </Button>
        </form>
      ) : null}
    </Fragment>
  );
};

export default NewProject;
