import React, { useReducer } from "react";
import projectContext from "./projectContext";
import projecReducer from "./projectReducer";
import { v4 as uuid } from "uuid";
import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
} from "../../types";

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
    errorFormSt: false,
  };

  //Actions Dispatch
  const [state, dispatch] = useReducer(projecReducer, initialState);

  const showForm = () => {
    dispatch({
      type: PROJECT_FORM,
    });
  };

  //CRUD

  //Get Projects
  const getProjects = () => {
    dispatch({
      type: GET_PROJECTS,
      payload: projects,
    });
  };

  //Add Project
  const addProject = (project) => {
    project.id = uuid();

    //Insert project to state
    dispatch({
      type: ADD_PROJECT,
      payload: project,
    });
  };

  //Validate Project Form
  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };

  return (
    <projectContext.Provider
      value={{
        //state
        projects: state.projects,
        newProjectFormSt: state.newProjectFormSt,
        errorFormSt: state.errorFormSt,
        //function
        showForm,
        getProjects,
        addProject,
        showError,
      }}
    >
      {props.children}{" "}
    </projectContext.Provider>
  );
};

export default ProjectState;
