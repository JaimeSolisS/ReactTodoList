const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Create projects
//api/projects
router.post(
  "/",
  auth,
  [check("name", "Enter a project name").notEmpty()],
  projectController.createProject
);

//get projects
router.get("/", auth, projectController.getProjects);

//update project
router.put(
  "/:id",
  auth,
  [check("name", "Enter a project name").notEmpty()],
  projectController.updateProject
);

//delete project
router.delete("/:id", auth, projectController.deleteProject);

module.exports = router;
