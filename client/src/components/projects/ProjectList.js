import React from "react";
import Project from "./Project";

const ProjectList = () => {
  const projects = [
    { name: "😎 Project 1" },
    { name: "🚀 Project 2" },
    { name: "🎱 Project 3" },
  ];
  return (
    <ul style={{ listStyle: "none" }}>
      {projects.map((project) => (
        <Project project={project} />
      ))}
    </ul>
  );
};

export default ProjectList;
