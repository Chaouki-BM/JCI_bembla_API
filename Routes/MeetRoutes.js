const express = require("express");
const meetController = require("../Controllers/MeetController.js");

const router = express.Router();

router.post("/", meetController.createMeet); // create a new meet
router.get("/", meetController.getMeets); // get all meets
router.get("/:id", meetController.getMeetById); // get a single meet by id
router.put("/:id", meetController.updateMeetById); // update a meet by id
router.delete("/:id", meetController.deleteMeetById); // delete a meet by id
router.get("/date", meetController.findMeetByDate); // find a meet by created at date


module.exports = router;
