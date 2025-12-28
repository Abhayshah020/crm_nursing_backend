const express = require("express");
const router = express.Router();
const coreVitalSignsController = require("../controllers/coreVitalSigns.controller");

// Create a new record
router.post("/", coreVitalSignsController.createVitalSign);

// Get all records (optional query: ?patientId=1)
router.get("/", coreVitalSignsController.getAllVitalSigns);

// Get a single record by id
router.get("/:id", coreVitalSignsController.getVitalSignById);

// Update a record by id
router.put("/:id", coreVitalSignsController.updateVitalSign);

// Delete a record by id
router.delete("/:id", coreVitalSignsController.deleteVitalSign);

module.exports = router;
