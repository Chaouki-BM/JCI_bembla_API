const express = require("express");
const responsableController = require("../Controllers/ResponsableController.js");

const router = express.Router();


router.post("/", responsableController.createResponsable); // create a new responsable
router.get("/", responsableController.getResponsables); // get all responsables
router.get("/:id", responsableController.getResponsableById); // get a single responsable by id
router.put("/:id", responsableController.updateResponsableById); // update a responsable by id
router.delete("/:id", responsableController.deleteResponsableById); // delete a responsable by id



module.exports = router;
