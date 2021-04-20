import React, { useReducer } from "react";
import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  STATUS_TASK,
} from "../../types";
import taskContext from "./taskContext";
import taskReducer from "./taskReducer";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      { id: 1, name: "Task 1", date: "Mon 19 Apr", status: true, projectId: 1 },
      { id: 2, name: "Task 2", date: "Tue 20 Apr", status: true, projectId: 2 },
      { id: 3, name: "Task 3", date: "Tue 20 Apr", status: true, projectId: 3 },
      {
        id: 4,
        name: "Task 4",
        date: "Tue 20 Apr",
        status: false,
        projectId: 4,
      },
      {
        id: 5,
        name: "Task 5",
        date: "Tue 20 Apr",
        status: false,
        projectId: 2,
      },
    ],
    tasksProjectSt: null,
    error: false,
    selectedTaskSt: null,
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

  const deleteTask = (id) => {
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  };

  const editTask = (task) => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task,
    });
  };

  const updateTask = (task) => {
    dispatch({
      type: UPDATE_TASK,
      payload: task,
    });
  };

  const changeStatusTask = (task) => {
    dispatch({
      type: STATUS_TASK,
      payload: task,
    });
  };

  return (
    <taskContext.Provider
      value={{
        //states
        tasks: state.tasks,
        tasksProjectSt: state.tasksProjectSt,
        error: state.error,
        selectedTaskSt: state.selectedTaskSt,
        //functions
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        editTask,
        updateTask,
        changeStatusTask,
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
