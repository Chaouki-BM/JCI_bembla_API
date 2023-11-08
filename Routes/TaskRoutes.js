const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/TaskController");

router.post("/", taskController.taskController.createTask);

router.get("/", taskController.taskController.getAllTasks);

// router.get("/:id", taskController.taskController.getTaskById);
router.get("/:eventId", taskController.taskController.getTaskById);
// update Task ---> 
router.put("/tasks/:id", taskController.taskController.updateTask);


// delete task
router.delete("/tasks/:id", taskController.taskController.deleteTask);
module.exports = router;