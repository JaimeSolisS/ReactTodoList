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

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true,
        msg: null,
      };

    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        msg: action.payload,
      };

    case LOGIN_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        msg: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        auth: true,
        user: action.payload,
      };

    case SIGN_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        auth: null,
        msg: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;
