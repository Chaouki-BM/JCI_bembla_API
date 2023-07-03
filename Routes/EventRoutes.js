const express = require("express");
const router = express.Router();
const EventController = require("../Controllers/EventController");

// Create a new event
router.post("/", EventController.createEvent);

// Get all events
router.get("/", EventController.getAllEvents);

// Get a single event by ID
router.get("/:id", EventController.getEventById);

// Update an event by ID
router.put("/:id", EventController.updateEventById);

// Delete an event by ID
router.delete("/:id", EventController.deleteEventById);

module.exports = router;
