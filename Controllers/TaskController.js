const express = require("express");
const Task = require("../models/Task"); // Importing your Task model

// Controller for handling different CRUD operations for Tasks
exports.taskController = {
  // Create a new task
  createTask: async (req, res) => {
    try {
      const newTask = new Task(req.body);
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find().populate("EventId").populate("ResponsibleUser");
      //const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a specific task by ID
  getTaskById: async (req, res) => {
    try {
    //   const task = await Task.findById(req.params.id);
      const task = await Task.findById(req.params.id)
        .populate("EventId")
        .populate("ResponsibleUser");

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a task by ID
  updateTask: async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a task by ID
  deleteTask: async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
