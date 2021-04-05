import React from "react";

const Task = ({ task }) => {
  return (
    <li>
      <p>{task.name}</p>
      <div>
        {task.status ? <button>Complete</button> : <button>Incomplete</button>}
      </div>

      <div>
        <button>Editar</button>
        <button>Eliminar</button>
      </div>
    </li>
  );
};

export default Task;
<p>From task</p>;
