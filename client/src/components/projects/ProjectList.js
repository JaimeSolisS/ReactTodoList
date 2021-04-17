import React from "react";
import Project from "./Project";
import Grid from "@material-ui/core/Grid";

const ProjectList = () => {
  const projects = [
    { name: "😎 Project 1" },
    { name: "🚀 Project 2" },
    { name: "🎱 Project 3" },
  ];
  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      {projects.map((project) => (
        <Project project={project} />
      ))}
    </Grid>
  );
};

export default ProjectList;
