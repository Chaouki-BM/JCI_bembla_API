const mongoose = require("mongoose");
const Presence = require("../Models/Presence.model.js");

const presenceController = {};

presenceController.createPresence = async (req, res) => {
  const { MeetId, UserId, Present } = req.body;
  try {
    const newPresence = new Presence({
      MeetId,
      UserId,
      Present,
    });
    await newPresence.save();
    res
      .status(201)
      .json({ message: "Presence created successfully", newPresence });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create presence" });
  }
};

presenceController.getPresences = async (req, res) => {
  try {
    const presences = await Presence.find()
      .populate("MeetId")
      .populate("UserId");
    res
      .status(200)
      .json({ message: "Presences retrieved successfully", presences });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get presences" });
  }
};

presenceController.getPresenceById = async (req, res) => {
  const { id } = req.params;
  try {
    const presence = await Presence.findById(id)
      .populate("MeetId")
      .populate("UserId");
    if (presence) {
      res
        .status(200)
        .json({ message: "Presence retrieved successfully", presence });
    } else {
      res.status(404).json({ message: "Presence not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get presence" });
  }
};

presenceController.updatePresenceById = async (req, res) => {
  const { id } = req.params;
  const { MeetId, UserId, Present } = req.body;
  try {
    const updatedPresence = await Presence.findByIdAndUpdate(
      id,
      { MeetId, UserId, Present },
      { new: true }
    );
    if (updatedPresence) {
      res
        .status(200)
        .json({ message: "Presence updated successfully", updatedPresence });
    } else {
      res.status(404).json({ message: "Presence not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update presence" });
  }
};

presenceController.deletePresenceById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPresence = await Presence.findByIdAndDelete(id);
    if (deletedPresence) {
      res
        .status(200)
        .json({ message: "Presence deleted successfully", deletedPresence });
    } else {
      res.status(404).json({ message: "Presence not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete presence" });
  }
};

module.exports = presenceController;
