const express = require("express");
const presenceController = require("../Controllers/PresenceController.js");

const router = express.Router();

router.post("/", presenceController.createPresence); // create a new presence
router.get("/", presenceController.getPresences); // get all presences
router.get("/:id", presenceController.getPresenceById); // get a single presence by id
router.put("/:id", presenceController.updatePresenceById); // update a presence by id
router.delete("/:id", presenceController.deletePresenceById); // delete a presence by id

module.exports = router;
