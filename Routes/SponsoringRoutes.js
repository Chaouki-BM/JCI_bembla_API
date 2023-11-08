const express = require("express");
const router = express.Router();
const SponsoringController = require("../Controllers/SponsoringController");

// Create a new sponsoring
router.post("/", SponsoringController.createSponsoring);

// Get all sponsorings
router.get("/", SponsoringController.getAllSponsorings);

// Get a single sponsoring by ID
router.get("/:id", SponsoringController.getSponsoringById);

// Update a sponsoring by ID
router.put("/:id", SponsoringController.updateSponsoringById);

// Delete a sponsoring by ID
router.delete("/:id", SponsoringController.deleteSponsoringById);

module.exports = router;
