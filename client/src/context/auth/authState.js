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

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    auht: null,
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
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: REGISTER_ERROR,
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
