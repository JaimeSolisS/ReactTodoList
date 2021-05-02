import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_OUT,
} from "../../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true,
        msg: null,
      };

    case REGISTER_ERROR:
      return {
        ...state,
        token: null,
        msg: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;
