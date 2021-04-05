import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    background:
      theme.palette.type === "dark"
        ? theme.palette.secondary.main
        : theme.palette.secondary.light,
  },
}));

const NewProject = () => {
  const classes = useStyles();

  const [project, setProject] = useState({
    name: "",
  });

  const { name } = project;

  const onChangeProject = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
    //console.log(project.name);
  };

  const onSubmitProject = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Button
        type="button"
        size="small"
        variant="contained"
        color="secondary"
        className={classes.submit}
      >
        New Project
      </Button>

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
    </Fragment>
  );
};

export default NewProject;
