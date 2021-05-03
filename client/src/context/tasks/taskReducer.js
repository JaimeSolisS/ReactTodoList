import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  STATUS_TASK,
} from "../../types";

const taskReducer = (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state,
        tasksProjectSt: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasksProjectSt: [...state.tasksProjectSt, action.payload],
        error: false,
      };
    case VALIDATE_TASK:
      return {
        ...state,
        error: true,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasksProjectSt: state.tasksProjectSt.filter(
          (task) => task._id !== action.payload
        ),
      };
    case ACTUAL_TASK:
      return {
        ...state,
        selectedTaskSt: action.payload,
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasksProjectSt: state.tasksProjectSt.map((task) =>
          task._id === action.payload ? action.payload : task
        ),
        selectedTaskSt: null,
      };
    case STATUS_TASK:
      return {
        ...state,
        tasksProjectSt: state.tasksProjectSt.map((task) =>
          task._id === action.payload ? action.payload : task
        ),
      };
    default:
      return state;
  }
};

export default taskReducer;
