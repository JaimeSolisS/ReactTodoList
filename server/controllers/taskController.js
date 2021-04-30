const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

//Create Task
exports.createTask = async (req, res) => {
  //Check for errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Get project and verify its existence
  const { project } = req.body;
  try {
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //Check project owner
    if (projectExists.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // create task
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error");
  }
};
