const mongoose = require("mongoose");
const Responsable = require("../Models/Responsable.model.js");

const responsableController = {};

responsableController.createResponsable = async (req, res) => {
  const { EventId, UserId, Role } = req.body;
  try {
    const newResponsable = new Responsable({
      EventId,
      UserId,
      Role,
    });
    await newResponsable.save();
    res
      .status(201)
      .json({ message: "Responsable created successfully", newResponsable });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create responsable" });
  }
};

// get all responsables
responsableController.getResponsables = async (req, res) => {
  try {
    const responsables = await Responsable.find()
      .populate("EventId")
      .populate("UserId");
    res
      .status(200)
      .json({ message: "Responsables retrieved successfully", responsables });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get responsables" });
  }
};

// by id
responsableController.getResponsableById = async (req, res) => {
  const { id } = req.params;
  try {
    const responsable = await Responsable.findById(id)
      .populate("EventId")
      .populate("UserId");
    if (responsable) {
      res
        .status(200)
        .json({ message: "Responsable retrieved successfully", responsable });
    } else {
      res.status(404).json({ message: "Responsable not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get responsable" });
  }
};

// -----------------------------
responsableController.updateResponsableById = async (req, res) => {
  const { id } = req.params;
  const {EventId , UserId, Role } = req.body;
  try {
    const updatedResponsable = await Responsable.findByIdAndUpdate(
      id,
      { EventId, UserId, Role },
      { new: true }
    );
    if (updatedResponsable) {
      res
        .status(200)
        .json({
          message: "Responsable updated successfully",
          updatedResponsable,
        });
    } else {
      res.status(404).json({ message: "Responsable not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update responsable" });
  }
};

// ------------------------------

responsableController.deleteResponsableById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedResponsable = await Responsable.findByIdAndDelete(id);
    if (deletedResponsable) {
      res
        .status(200)
        .json({
          message: "Responsable deleted successfully",
          deletedResponsable,
        });
    } else {
      res.status(404).json({ message: "Responsable not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete responsable" });
  }
};



module.exports = responsableController;
