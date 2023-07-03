const Sponsoring = require("../Models/Sponsoring.model");

// Create a new sponsoring
exports.createSponsoring = async (req, res) => {
  const { SName, SPlace, SPhone } = req.body;

  try {
    const sponsoring = await Sponsoring.create({ SName, SPlace, SPhone });
    res.status(201).json({ sponsoring });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all sponsorings
exports.getAllSponsorings = async (req, res) => {
  try {
    const sponsorings = await Sponsoring.find();
    res.status(200).json({ sponsorings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single sponsoring by ID
exports.getSponsoringById = async (req, res) => {
  const { id } = req.params;

  try {
    const sponsoring = await Sponsoring.findById(id);
    if (!sponsoring) {
      return res.status(404).json({ message: "Sponsoring not found" });
    }
    res.status(200).json({ sponsoring });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a sponsoring by ID
exports.updateSponsoringById = async (req, res) => {
  const { id } = req.params;
  const { SName, SPlace, SPhone } = req.body;

  try {
    const sponsoring = await Sponsoring.findByIdAndUpdate(
      id,
      { SName, SPlace, SPhone },
      { new: true }
    );
    if (!sponsoring) {
      return res.status(404).json({ message: "Sponsoring not found" });
    }
    res.status(200).json({ sponsoring });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a sponsoring by ID
exports.deleteSponsoringById = async (req, res) => {
  const { id } = req.params;

  try {
    const sponsoring = await Sponsoring.findByIdAndDelete(id);
    if (!sponsoring) {
      return res.status(404).json({ message: "Sponsoring not found" });
    }
    res.status(200).json({ message: "Sponsoring deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
