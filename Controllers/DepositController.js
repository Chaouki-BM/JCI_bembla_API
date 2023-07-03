const Deposit = require("../Models/Deposit.model");

// Create a new deposit
exports.createDeposit = async (req, res) => {
  const { Amount, Description, CodeG } = req.body;

  try {
    const deposit = await Deposit.create({ Amount, Description, CodeG });
    res.status(201).json({ deposit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all deposits
exports.getAllDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find();
    res.status(200).json({ deposits });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single deposit by ID
exports.getDepositById = async (req, res) => {
  const { id } = req.params;

  try {
    const deposit = await Deposit.findById(id);
    if (!deposit) {
      return res.status(404).json({ message: "Deposit not found" });
    }
    res.status(200).json({ deposit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a deposit by ID
exports.updateDepositById = async (req, res) => {
  const { id } = req.params;
  const { Amount, Description, CodeG } = req.body;

  try {
    const deposit = await Deposit.findByIdAndUpdate(
      id,
      { Amount, Description, CodeG },
      { new: true }
    );
    if (!deposit) {
      return res.status(404).json({ message: "Deposit not found" });
    }
    res.status(200).json({ deposit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a deposit by ID
exports.deleteDepositById = async (req, res) => {
  const { id } = req.params;

  try {
    const deposit = await Deposit.findByIdAndDelete(id);
    if (!deposit) {
      return res.status(404).json({ message: "Deposit not found" });
    }
    res.status(200).json({ message: "Deposit deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
