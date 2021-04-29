const Project = require("../models/Project");
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
