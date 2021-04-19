import { TASKS_PROJECT, ADD_TASK, VALIDATE_TASK } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state,
        tasksProjectSt: state.tasks.filter(
          (task) => task.projectId === action.payload
        ),
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: false,
      };
    case VALIDATE_TASK:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
