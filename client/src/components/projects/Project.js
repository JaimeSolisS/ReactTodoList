import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const Project = ({ project }) => {
  //Project State
  const projectsContext = useContext(projectContext);
  const { actualProject } = projectsContext;

  //Tasks
  const tasksContext = useContext(taskContext);
  const { getTasks } = tasksContext;

  //get selected project
  const selectProject = (id) => {
    actualProject(id); //set actual project
    getTasks(id); // filter tasks
  };

  return (
    <Grid>
      <Button
        style={{ textTransform: "none" }}
        onClick={() => selectProject(project.id)}
      >
        <Typography variant="h6" gutterBottom>
          {project.name}
        </Typography>
      </Button>
    </Grid>
  );
};

export default Project;
