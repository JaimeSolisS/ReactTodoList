import React, { useReducer } from "react";
import projectContext from "./projectContext";
import projecReducer from "./projectReducer";
import { v4 as uuid } from "uuid";
import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
} from "../../types";

const ProjectState = (props) => {
  const projects = [{ id: 1, name: " Welcome 👋" }];

  const initialState = {
    projects: [],
    newProjectFormSt: false,
    errorFormSt: false,
    project: null,
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

  //Select Project
  const actualProject = (projectId) => {
    dispatch({
      type: ACTUAL_PROJECT,
      payload: projectId,
    });
  };

  //Delete project
  const deleteProject = (projectId) => {
    dispatch({
      type: DELETE_PROJECT,
      payload: projectId,
    });
  };

  return (
    <projectContext.Provider
      value={{
        //state
        projects: state.projects,
        newProjectFormSt: state.newProjectFormSt,
        errorFormSt: state.errorFormSt,
        project: state.project,
        //function
        showForm,
        getProjects,
        addProject,
        showError,
        actualProject,
        deleteProject,
      }}
    >
      {props.children}{" "}
    </projectContext.Provider>
  );
};

export default ProjectState;
