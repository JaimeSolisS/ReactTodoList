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

  try {
    //Get project and verify its existence
    const { project } = req.body;
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

//get tasks of a project
exports.getTasks = async (req, res) => {
  try {
    //Get project and check if exists
    const { project } = req.query;
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //Check project owner
    if (projectExists.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    //get tasks for project
    const tasks = await Task.find({ project });
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error");
  }
};

//Updtae task

exports.updateTask = async (req, res) => {
  try {
    //Get project and check if exists
    const { project, name, status, dueDate } = req.body;

    const projectExists = await Project.findById(project);

    if (!projectExists) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //Check project owner
    if (projectExists.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    //Check if task exist
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const newTask = {};

    //User may change or not these fields
    newTask.name = name;
    newTask.status = status;
    newTask.dueDate = dueDate;

    //Save task
    task = await Task.findByIdAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });

    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error");
  }
};

//Delete task
exports.deleteTask = async (req, res) => {
  try {
    //Get project and check if exists
    const { project } = req.query;

    const projectExists = await Project.findById(project);

    if (!projectExists) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //Check project owner
    if (projectExists.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    //Check if task exist
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    //delete task
    await Task.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error");
  }
};
