const Income = require("../Models/Income.model");

// Create a new income
exports.createIncome = async (req, res) => {
  const { Source, Amount, CodeG } = req.body;

  try {
    const income = await Income.create({ Source, Amount, CodeG });
    res.status(201).json({ income });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all incomes
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().populate("Source");
    res.status(200).json({ incomes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single income by ID
exports.getIncomeById = async (req, res) => {
  const { id } = req.params;

  try {
    const income = await Income.findById(id).populate("Source");
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ income });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an income by ID
exports.updateIncomeById = async (req, res) => {
  const { id } = req.params;
  const { Source, Amount, CodeG } = req.body;

  try {
    const income = await Income.findByIdAndUpdate(
      id,
      { Source, Amount, CodeG },
      { new: true }
    ).populate("Source");
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ income });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an income by ID
exports.deleteIncomeById = async (req, res) => {
  const { id } = req.params;

  try {
    const income = await Income.findByIdAndDelete(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
