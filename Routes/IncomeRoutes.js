const express = require("express");
const router = express.Router();
const IncomeController = require("../Controllers/IncomeController");

// Create a new income
router.post("/", IncomeController.createIncome);

// Get all incomes
router.get("/", IncomeController.getAllIncomes);

// Get a single income by ID
router.get("/:id", IncomeController.getIncomeById);

// Update an income by ID
router.put("/:id", IncomeController.updateIncomeById);

// Delete an income by ID
router.delete("/:id", IncomeController.deleteIncomeById);

module.exports = router;
