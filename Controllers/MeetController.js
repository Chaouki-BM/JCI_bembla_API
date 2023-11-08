const mongoose = require("mongoose");
const Meet = require("../Models/Meet.model.js");

const meetController = {};

meetController.createMeet = async (req, res) => {
  const { Description } = req.body;
  try {
    const newMeet = new Meet({
      Description,
    });
    await newMeet.save();
    res.status(201).json({ message: "Meet created successfully", newMeet });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create meet" });
  }
};

meetController.getMeets = async (req, res) => {
  try {
    const meets = await Meet.find();
    res.status(200).json({ message: "Meets retrieved successfully", meets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get meets" });
  }
};

meetController.getMeetById = async (req, res) => {
  const { id } = req.params;
  try {
    const meet = await Meet.findById(id);
    if (meet) {
      res.status(200).json({ message: "Meet retrieved successfully", meet });
    } else {
      res.status(404).json({ message: "Meet not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get meet" });
  }
};

meetController.updateMeetById = async (req, res) => {
  const { id } = req.params;
  const { Description } = req.body;
  try {
    const updatedMeet = await Meet.findByIdAndUpdate(
      id,
      { Description },
      { new: true }
    );
    if (updatedMeet) {
      res
        .status(200)
        .json({ message: "Meet updated successfully", updatedMeet });
    } else {
      res.status(404).json({ message: "Meet not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update meet" });
  }
};

meetController.deleteMeetById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMeet = await Meet.findByIdAndDelete(id);
    if (deletedMeet) {
      res
        .status(200)
        .json({ message: "Meet deleted successfully", deletedMeet });
    } else {
      res.status(404).json({ message: "Meet not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete meet" });
  }
};

meetController.findMeetByDate = async (req, res) => {
  const { date } = req.query;
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      res.status(400).json({ message: "Invalid date format" });
    } else {
      const startOfDay = new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate()
      );
      const endOfDay = new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate() + 1
      );
      const meet = await Meet.findOne({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      });
      if (meet) {
        res.status(200).json({ message: "Meet found by date", meet });
      } else {
        res.status(404).json({ message: "No meet found by date" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to find meet by date" });
  }
};

module.exports = meetController;
