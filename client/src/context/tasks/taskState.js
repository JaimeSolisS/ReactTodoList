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
import { v4 as uuid } from "uuid";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      {
        id: 1,
        name: "This task is completed ☑️",
        status: true,
        projectId: 1,
      },
      {
        id: 2,
        name: "Click the ⭕️ to mark this task as completed",
        status: false,
        projectId: 1,
      },

      {
        id: 3,
        name: "Add a new task ➕",
        status: false,
        projectId: 1,
      },
      {
        id: 4,
        name: "Edit this task's name ✏️ ",
        status: false,
        projectId: 1,
      },
      {
        id: 5,
        name: "Schedule this task 📅",
        status: false,
        projectId: 1,
      },
      {
        id: 6,
        name: "Delete this task 🗑",
        status: false,
        projectId: 1,
      },
      {
        id: 7,
        name: "Click ➕ next to Projects to add one of your own",
        status: false,
        projectId: 1,
      },
      {
        id: 8,
        name: "Click 🗑 below to delete this project",
        status: false,
        projectId: 1,
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
    task.id = uuid();
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
