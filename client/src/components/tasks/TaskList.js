import React, { Fragment } from "react";
import Task from "./Task";

const TaskList = () => {
  const tasks = [
    { name: "Task 1", status: true },
    { name: "Task 2", status: true },
    { name: "Task 3", status: true },
    { name: "Task 4", status: false },
    { name: "Task 5", status: false },
  ];
  return (
    <Fragment>
      <h2>Project: Name</h2>

      <ul>
        {tasks.length === 0 ? (
          <li>There are no tasks to do</li>
        ) : (
          tasks.map((task) => <Task task={task} />)
        )}
      </ul>
      <button>Delete Project</button>
    </Fragment>
  );
};

export default TaskList;
