const Training = require("../Models/Training.model");

// Create a new training
exports.createTraining = async (req, res) => {
  const { NameFormer, Description, DateT } = req.body;

  try {
    const training = await Training.create({ NameFormer, Description, DateT });
    res.status(200).json({ training });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all trainings
exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.status(200).json({ trainings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single training by ID
exports.getTrainingById = async (req, res) => {
  const { id } = req.params;

  try {
    const training = await Training.findById(id);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json({ training });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a training by ID
exports.updateTrainingById = async (req, res) => {
  const { id } = req.params;
  const { NameFormer, Description, DateT } = req.body;

  try {
    const training = await Training.findByIdAndUpdate(
      id,
      { NameFormer, Description, DateT },
      { new: true }
    );
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json({ training });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a training by ID
exports.deleteTrainingById = async (req, res) => {
  const { id } = req.params;

  try {
    const training = await Training.findByIdAndDelete(id);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json({ message: "Training deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
