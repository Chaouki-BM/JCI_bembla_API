const Former = require("../Models/Former.model");

// Create a new former
exports.createFormer = async (req, res) => {
  const { FullName, Phone, Speciality } = req.body;

  try {
    const former = await Former.create({ FullName, Phone, Speciality });
    res.status(200).json({ former });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all formers
exports.getAllFormers = async (req, res) => {
  try {
    const formers = await Former.find();
    res.status(200).json({ formers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single former by ID
exports.getFormerById = async (req, res) => {
  const { id } = req.params;

  try {
    const former = await Former.findById(id);
    if (!former) {
      return res.status(404).json({ message: "Former not found" });
    }
    res.status(200).json({ former });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a former by ID
exports.updateFormerById = async (req, res) => {
  const { id } = req.params;
  const { FullName, Phone, Speciality } = req.body;

  try {
    const former = await Former.findByIdAndUpdate(
      id,
      { FullName, Phone, Speciality },
      { new: true }
    );
    if (!former) {
      return res.status(404).json({ message: "Former not found" });
    }
    res.status(200).json({ former });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a former by ID
exports.deleteFormerById = async (req, res) => {
  const { id } = req.params;

  try {
    const former = await Former.findByIdAndDelete(id);
    if (!former) {
      return res.status(404).json({ message: "Former not found" });
    }
    res.status(200).json({ message: "Former deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
