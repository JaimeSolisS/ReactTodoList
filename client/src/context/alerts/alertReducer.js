import {
  SHOW_ALERT_USER,
  HIDE_ALERT_USER,
  SHOW_ALERT_EMAIL,
  HIDE_ALERT_EMAIL,
  SHOW_ALERT_PASSWORD,
  HIDE_ALERT_PASSWORD,
} from "../../types";

const alertReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT_USER:
      return {
        //alertSt: true,
        alertUserSt: action.payload,
      };
    case HIDE_ALERT_USER:
      return {
        alertUserSt: false,
      };
    case SHOW_ALERT_EMAIL:
      return {
        //alertSt: true,
        alertEmailSt: action.payload,
      };
    case HIDE_ALERT_EMAIL:
      return {
        alerEmailtSt: false,
      };
    case SHOW_ALERT_PASSWORD:
      return {
        //alertSt: true,
        alertPasswordSt: action.payload,
      };
    case HIDE_ALERT_PASSWORD:
      return {
        alertPasswordSt: false,
      };
    default:
      return state;
  }
};
export default alertReducer;
