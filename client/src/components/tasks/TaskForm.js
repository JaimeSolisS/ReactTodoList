import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";
import moment from "moment";

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

const TaskForm = () => {
  const classes = useStyles();

  //Extract if a project is selected
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  //Tasks
  const tasksContext = useContext(taskContext);
  const { error, addTask, validateTask, getTasks } = tasksContext;

  //Form state
  const [task, setTask] = useState({
    name: "",
    date: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // If there's no selected project
  if (!project) return null;

  const [actualProject] = project;

  //extract name
  const { name } = task;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validation
    if (name === "") {
      validateTask();
      return;
    }
    //add new task to state
    task.projectId = actualProject.id;
    task.state = false;

    if (selectedDate == null) task.date = selectedDate;
    else task.date = moment(selectedDate).format("ddd D MMM ");

    addTask(task);

    getTasks(actualProject.id);

    //clear form
    setTask({
      name: "",
    });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "50%" }}>
        <form className="center-column" onSubmit={onSubmit}>
          <TextField
            fullWidth
            variant="standard"
            margin="normal"
            label="Task Name"
            name="name"
            autoComplete="name"
            autoFocus
            color="secondary"
            id="name"
            value={name}
            onChange={handleChange}
            helperText={error ? "Please enter a name for the task!" : ""}
            error={!!error}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              color="secondary"
              // variant="inline"
              margin="normal"
              id="date-picker-dialog"
              label="Due Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>

          <Button
            fullWidth
            type="submit"
            size="small"
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Add Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
