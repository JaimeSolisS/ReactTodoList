import React, { useReducer } from "react";
import projectContext from "./projectContext";
import projecReducer from "./projectReducer";
import { v4 as uuid } from "uuid";
import { PROJECT_FORM, GET_PROJECTS, ADD_PROJECT } from "../../types";

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

  return (
    <projectContext.Provider
      value={{
        //state
        projects: state.projects,
        newProjectFormSt: state.newProjectFormSt,
        //function
        showForm,
        getProjects,
        addProject,
      }}
    >
      {props.children}{" "}
    </projectContext.Provider>
  );
};

export default ProjectState;
