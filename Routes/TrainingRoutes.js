const express = require("express");
const router = express.Router();
const TrainingController = require("../Controllers/TrainingController");

// Create a new training
router.post("/", TrainingController.createTraining);

// Get all trainings
router.get("/", TrainingController.getAllTrainings);

// Get a single training by ID
router.get("/:id", TrainingController.getTrainingById);

// Update a training by ID
router.put("/:id", TrainingController.updateTrainingById);

// Delete a training by ID
router.delete("/:id", TrainingController.deleteTrainingById);

module.exports = router;
