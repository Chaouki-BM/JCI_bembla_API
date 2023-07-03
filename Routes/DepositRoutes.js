const express = require("express");
const router = express.Router();
const DepositController = require("../Controllers/DepositController");

// Create a new deposit
router.post("/", DepositController.createDeposit);

// Get all deposits
router.get("/", DepositController.getAllDeposits);

// Get a single deposit by ID
router.get("/:id", DepositController.getDepositById);

// Update a deposit by ID
router.put("/:id", DepositController.updateDepositById);

// Delete a deposit by ID
router.delete("/:id", DepositController.deleteDepositById);

module.exports = router;
