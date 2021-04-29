const Project = require("../models/Project");

exports.createProject = async (req, res) => {
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
