import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_OUT,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    auht: null,
    user: null,
    msg: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <authContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user: state.user,
        msg: state.msg,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
