const Event = require("../Models/Event.model");
const Task = require("../Models/Task.model")
// Create a new event
exports.createEvent = async (req, res) => {
  const { Responsible, title, Description } = req.body;

  try {
    const event = await Event.create({ Responsible, title, Description });
    res.status(201).json({ event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an event by ID
exports.updateEventById = async (req, res) => {
  const { id } = req.params;
  const { Responsible, title, Description} = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      id,
      { Responsible, title, Description},
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an event by ID
// exports.deleteEventById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const event = await Event.findByIdAndDelete(id);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }
//     res.status(200).json({ message: "Event deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// Delete an event by ID
exports.deleteEventById = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.deleteMany({ EventId: id });
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event and related tasks deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
