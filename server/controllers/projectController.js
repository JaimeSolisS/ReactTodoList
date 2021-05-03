const Project = require("../models/Project");
const Task = require("../models/Task");
const { validationResult } = require("express-validator");

exports.createProject = async (req, res) => {
  //Check for errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //Create project
    const project = new Project(req.body);

    //save owner with JWT
    project.owner = req.user.id;

    //save project
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error");
  }
};

//Get user projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error");
  }
};

//Update project
exports.updateProject = async (req, res) => {
  //Check for errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //get project info
  const { name } = req.body;
  const newProject = {};

  //field to update
  if (name) {
    newProject.name = name;
  }

  try {
    //Check ID
    //console.log(req.params.id)
    let project = await Project.findById(req.params.id);

    //Check if project exists
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //Check project owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    //update
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    res.json({ project });
  } catch (error) {
    console.log(500);
    res.status(500).send("Server error");
  }
};

//delete project
exports.deleteProject = async (req, res) => {
  try {
    //Check ID
    //console.log(req.params.id)
    let project = await Project.findById(req.params.id);

    //Check if project exists
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //Check project owner
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    //delete the tasks of the project
    await Task.deleteMany({ project: req.params.id });
    //delete project
    await Project.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "Project removed" });
  } catch (error) {
    console.log(500);
    res.status(500).send("Server error");
  }
};
