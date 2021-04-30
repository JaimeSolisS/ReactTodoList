const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Create task
//api/task
router.post(
  "/",
  auth,
  [check("name", "Enter a task name").notEmpty()],
  [check("project", "Enter a project name").notEmpty()], //not necesary, just make it a little more secure
  taskController.createTask
);

//get tasks
router.get("/", auth, taskController.getTasks);

//update task
router.put("/:id", auth, taskController.updateTask);

//delete task
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
