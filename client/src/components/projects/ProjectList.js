import React, { useContext, useEffect } from "react";
import Project from "./Project";
import Grid from "@material-ui/core/Grid";
import projectContext from "../../context/projects/projectContext";
import { GET_PROJECTS } from "../../types";
import { Typography } from "@material-ui/core";

const ProjectList = () => {
  //Get projects from state
  const projectsContext = useContext(projectContext);
  const { projects, getProjects } = projectsContext;

  //Get projects on load
  useEffect(() => {
    getProjects();
  }, []);

  //Check if there are projects
  if (projects.length === 0)
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="subtle1" gutterBottom>
            You have no projects
          </Typography>
        </Grid>
      </Grid>
    );

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </Grid>
  );
};

export default ProjectList;
