import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import projectContext from "../../context/projects/projectContext";
const Project = ({ project }) => {
  //Project State
  const projectsContext = useContext(projectContext);
  const { actualProject } = projectsContext;

  return (
    <Grid>
      <Button
        style={{ textTransform: "none" }}
        onClick={() => actualProject(project.id)}
      >
        <Typography variant="h6" gutterBottom>
          {project.name}
        </Typography>
      </Button>
    </Grid>
  );
};

export default Project;
