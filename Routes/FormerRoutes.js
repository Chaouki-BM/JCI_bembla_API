const express = require("express");
const router = express.Router();
const FormerController = require("../Controllers/FormerController");

// Create a new former
router.post("/", FormerController.createFormer);

// Get all formers
router.get("/", FormerController.getAllFormers);

// Get a single former by ID
router.get("/:id", FormerController.getFormerById);

// Update a former by ID
router.put("/:id", FormerController.updateFormerById);

// Delete a former by ID
router.delete("/:id", FormerController.deleteFormerById);

module.exports = router;
