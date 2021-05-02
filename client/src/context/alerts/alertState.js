import React, { useReducer } from "react";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";
import {
  SHOW_ALERT_USER,
  HIDE_ALERT_USER,
  SHOW_ALERT_EMAIL,
  HIDE_ALERT_EMAIL,
  SHOW_ALERT_PASSWORD,
  HIDE_ALERT_PASSWORD,
} from "../../types";

const AlertState = (props) => {
  const initialState = {
    alertUserSt: null,
    alertEmailSt: null,
    alertPasswordSt: null,
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //functions
  const showAlertUser = (msg) => {
    dispatch({
      type: SHOW_ALERT_USER,
      payload: msg,
    });
  };
  const hideAlertUser = () => {
    dispatch({
      type: HIDE_ALERT_USER,
    });
  };
  const showAlertEmail = (msg) => {
    dispatch({
      type: SHOW_ALERT_EMAIL,
      payload: msg,
    });
  };
  const hideAlertEmail = () => {
    dispatch({
      type: HIDE_ALERT_EMAIL,
    });
  };
  const showAlertPassword = (msg) => {
    dispatch({
      type: SHOW_ALERT_PASSWORD,
      payload: msg,
    });
  };
  const hideAlertPassword = () => {
    dispatch({
      type: HIDE_ALERT_PASSWORD,
    });
  };

  return (
    <alertContext.Provider
      value={{
        //state
        alertUserSt: state.alertUserSt,
        alertEmailSt: state.alertEmailSt,
        alertPasswordSt: state.alertPasswordSt,
        //function
        showAlertUser,
        hideAlertUser,
        showAlertEmail,
        hideAlertEmail,
        showAlertPassword,
        hideAlertPassword,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
