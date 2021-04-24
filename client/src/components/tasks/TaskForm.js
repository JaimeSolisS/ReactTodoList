import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
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

const TaskForm = (props) => {
  const classes = useStyles();

  //Extract if a project is selected
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  //Tasks
  const tasksContext = useContext(taskContext);
  const {
    error,
    selectedTaskSt,
    addTask,
    validateTask,
    getTasks,
    updateTask,
  } = tasksContext;

  useEffect(() => {
    if (selectedTaskSt !== null) {
      setTask(selectedTaskSt);
      setSelectedDate(selectedTaskSt.dateObj);
    } else
      setTask({
        name: "",
        date: "",
      });
  }, [selectedTaskSt]);

  //Form state
  const [task, setTask] = useState({
    name: "",
    date: "",
    dateObj: "",
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

    //Check if it's a new task or an edit because it adds a new task when edit
    if (selectedTaskSt === null) {
      //add new task to state
      task.projectId = actualProject.id;
      task.state = false;

      if (selectedDate == null) task.date = selectedDate;
      else task.date = moment(selectedDate).format("ddd D MMM ");
      task.dateObj = selectedDate; //for edition

      addTask(task);
      handleDateChange(null); //clear datepicker
    } else {
      //if (selectedDate == null) task.date = selectedDate;
      //else task.date = moment(selectedDate).format("ddd D MMM ");
      //task.dateObj = selectedDate; //for edition
      if (selectedDate != null)
        task.date = moment(selectedDate).format("ddd D MMM ");
      task.dateObj = selectedDate; //for edition
      updateTask(task);
      handleDateChange(null); //clear datepicker
    }

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
        <form onSubmit={onSubmit}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}
              >
                <Grid item xs={12} md={12}>
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
                    helperText={
                      error ? "Please enter a name for the task!" : ""
                    }
                    error={!!error}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
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
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={props.onCloseModal}
                >
                  {selectedTaskSt ? "Save Task" : "Add Task"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
