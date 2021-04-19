import React, { useReducer } from "react";
import { TASKS_PROJECT, ADD_TASK, VALIDATE_TASK } from "../../types";
import taskContext from "./taskContext";
import taskReducer from "./taskReducer";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      { name: "Task 1", date: "Mon 19 Apr", status: true, projectId: 1 },
      { name: "Task 2", date: "Tue 20 Apr", status: true, projectId: 2 },
      { name: "Task 3", date: "Tue 20 Apr", status: true, projectId: 3 },
      { name: "Task 4", date: "Tue 20 Apr", status: false, projectId: 4 },
      { name: "Task 5", date: "Tue 20 Apr", status: false, projectId: 2 },
    ],
    tasksProjectSt: null,
    error: false,
  };

  // create dispatch & state
  const [state, dispatch] = useReducer(taskReducer, initialState);

  //FUNCTIONS
  //get tasks from a project
  const getTasks = (projectId) => {
    dispatch({
      type: TASKS_PROJECT,
      payload: projectId,
    });
  };

  //add task to project
  const addTask = (task) => {
    dispatch({
      type: ADD_TASK,
      payload: task,
    });
  };

  //validate task

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  return (
    <taskContext.Provider
      value={{
        //states
        tasks: state.tasks,
        tasksProjectSt: state.tasksProjectSt,
        error: state.error,
        //functions
        getTasks,
        addTask,
        validateTask,
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
