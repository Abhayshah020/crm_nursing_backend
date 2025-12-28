const express = require("express");
const router = express.Router();

const controller = require("../controllers/painComfortAssessment.controller");

// CREATE
router.post("/", controller.createPainAssessment);

// READ
router.get("/", controller.getAllPainAssessments);
router.get("/:id", controller.getPainAssessmentById);
// UPDATE
router.put("/:id", controller.updatePainAssessment);

// DELETE
router.delete("/:id", controller.deletePainAssessment);

module.exports = router;
