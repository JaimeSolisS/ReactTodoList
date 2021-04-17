import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const Project = ({ project }) => {
  return (
    <Grid>
      <Button style={{ textTransform: "none" }}>
        <Typography variant="h6" gutterBottom>
          {project.name}
        </Typography>
      </Button>
    </Grid>
  );
};

export default Project;
