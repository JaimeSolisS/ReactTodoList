import React, { useReducer } from "react";
import projectContext from "./projectContext";
import projecReducer from "./projectReducer";
import { PROJECT_FORM, GET_PROJECTS } from "../../types";

const ProjectState = (props) => {
  const projects = [
    { id: 1, name: " Project 1 😎" },
    { id: 2, name: "Project 2 🚀 " },
    { id: 3, name: "Project 3 🎱 " },
    { id: 4, name: "Project 4 ✈️ " },
  ];

  const initialState = {
    projects: [],
    newProjectFormSt: false,
  };

  //Actions Dispatch
  const [state, dispatch] = useReducer(projecReducer, initialState);

  //Get Projects
  const getProjects = () => {
    dispatch({
      type: GET_PROJECTS,
      payload: projects,
    });
  };

  //CRUD
  const showForm = () => {
    dispatch({
      type: PROJECT_FORM,
    });
  };

  return (
    <projectContext.Provider
      value={{
        //state
        projects: state.projects,
        newProjectFormSt: state.newProjectFormSt,
        //function
        showForm,
        getProjects,
      }}
    >
      {props.children}{" "}
    </projectContext.Provider>
  );
};

export default ProjectState;
