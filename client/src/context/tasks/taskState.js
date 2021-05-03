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
//import { v4 as uuid } from "uuid";
import axiosClient from "../../config/axios";

const TaskState = (props) => {
  const initialState = {
    /*tasks: [
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
        ],*/
    tasksProjectSt: [],
    error: false,
    selectedTaskSt: null,
  };

  // create dispatch & state
  const [state, dispatch] = useReducer(taskReducer, initialState);

  //FUNCTIONS
  //get tasks from a project
  const getTasks = async (project) => {
    console.log(project);
    try {
      const res = await axiosClient.get("/api/tasks", { params: { project } });
      console.log(res);
      dispatch({
        type: TASKS_PROJECT,
        payload: res.data.tasks,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //add task to project
  const addTask = async (task) => {
    //task.id = uuid(); ->id comes from back
    console.log(task);
    try {
      const res = await axiosClient.post("/api/tasks", task);
      console.log(res);
      dispatch({
        type: ADD_TASK,
        payload: task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //validate task

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  const deleteTask = async (id, project) => {
    try {
      await axiosClient.delete(`/api/tasks/${id}`, { params: { project } });
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (task) => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task,
    });
  };

  const updateTask = async (task) => {
    try {
      const res = await axiosClient.put(`/api/tasks/${task._id}`, task);
      console.log(res);
      dispatch({
        type: UPDATE_TASK,
        payload: res.data.task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatusTask = async (task) => {
    try {
      const res = await axiosClient.put(`/api/tasks/${task._id}`, task);
      console.log(res);
      dispatch({
        type: STATUS_TASK,
        payload: res.data.task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <taskContext.Provider
      value={{
        //states
        //tasks: state.tasks,
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
