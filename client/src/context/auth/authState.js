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
} from "../../types";
import axiosClient from "../../config/axios";
import authToken from "../../config/authToken";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    auth: null,
    user: null,
    msg: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //func

  const registerUser = async (data) => {
    try {
      const res = await axiosClient.post("/api/users", data);
      console.log(res);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      //get user

      userAuthenticated();
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

  return (
    <AuthContext.Provider
      value={{
        //state
        token: state.token,
        auth: state.auth,
        user: state.user,
        msg: state.msg,
        //func
        registerUser,
        logIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
