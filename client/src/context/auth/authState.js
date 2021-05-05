import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_OUT,
  ADD_PROJECT,
  ADD_TASK,
} from "../../types";
import axiosClient from "../../config/axios";
import authToken from "../../config/authToken";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    auth: null,
    user: null,
    msg: null,
    load: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //func

  const registerUser = async (data) => {
    try {
      const res = await axiosClient.post("/api/users", data);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      //get user
      userAuthenticated();

      //Insert tutorial in User account
      //Project
      const resP = await axiosClient.post("/api/projects", {
        name: " Welcome 👋",
      });
      dispatch({
        type: ADD_PROJECT,
        payload: resP.data,
      });
      console.log("id project", resP.data._id);
      //Tasks
      //1)
      const resT1 = await axiosClient.post("/api/tasks", {
        name: "This task is completed ☑️",
        status: true,
        project: resP.data._id,
        dueDate: null,
      });
      dispatch({
        type: ADD_TASK,
        payload: resT1.data.task,
      });
      //2)
      const resT2 = await axiosClient.post("/api/tasks", {
        name: "Click the ⭕️ to mark this task as completed",
        status: false,
        project: resP.data._id,
        dueDate: null,
      });
      dispatch({
        type: ADD_TASK,
        payload: resT2.data.task,
      });
      //3)
      const resT3 = await axiosClient.post("/api/tasks", {
        name: "Add a new task ➕ with the button below",
        status: false,
        project: resP.data._id,
        dueDate: null,
      });
      dispatch({
        type: ADD_TASK,
        payload: resT3.data.task,
      });
      //4)
      const resT4 = await axiosClient.post("/api/tasks", {
        name: "Edit this task's name ✏️ ",
        status: false,
        project: resP.data._id,
        dueDate: null,
      });
      dispatch({
        type: ADD_TASK,
        payload: resT4.data.task,
      });
      //5)
      const resT5 = await axiosClient.post("/api/tasks", {
        name: "Schedule this task 📅",
        status: false,
        project: resP.data._id,
        dueDate: null,
      });
      dispatch({
        type: ADD_TASK,
        payload: resT5.data.task,
      });
      //6)
      const resT6 = await axiosClient.post("/api/tasks", {
        name: "Delete this task 🗑",
        status: false,
        project: resP.data._id,
        dueDate: null,
      });
      dispatch({
        type: ADD_TASK,
        payload: resT6.data.task,
      });
      //7)
      const resT7 = await axiosClient.post("/api/tasks", {
        name: "Click ➕ next to Projects to add one of your own",
        status: false,
        project: resP.data._id,
        dueDate: null,
      });
      dispatch({
        type: ADD_TASK,
        payload: resT7.data.task,
      });
      //8)
      const resT8 = await axiosClient.post("/api/tasks", {
        name: "Click 🗑 below to delete this project",
        status: false,
        project: resP.data._id,
        dueDate: null,
      });
      dispatch({
        type: ADD_TASK,
        payload: resT8.data.task,
      });
    } catch (error) {
      //console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
      };

      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  };

  // return auth user
  const userAuthenticated = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      //send token in header
      authToken(token);
    }

    try {
      const res = await axiosClient.get("/api/auth");
      // console.log(res);
      dispatch({
        type: GET_USER,
        payload: res.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //User log in
  const logIn = async (data) => {
    try {
      const res = await axiosClient.post("/api/auth", data);
      //console.log(res);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      //get user
      userAuthenticated();
    } catch (error) {
      // console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };

  //Log out user
  const logOut = () => {
    dispatch({
      type: SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        //state
        token: state.token,
        auth: state.auth,
        user: state.user,
        msg: state.msg,
        load: state.load,
        //func
        registerUser,
        logIn,
        userAuthenticated,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
