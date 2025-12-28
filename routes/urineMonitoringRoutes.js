const express = require("express");
const router = express.Router();
const urineController = require("../controllers/urineMonitoringController");

// Create
router.post("/", urineController.createUrineMonitoring);

// Get all or filter by patient
router.get("/", urineController.getAllUrineMonitoring);

// Get by ID
router.get("/:id", urineController.getUrineMonitoringById);

// Update
router.put("/:id", urineController.updateUrineMonitoring);

// Delete
router.delete("/:id", urineController.deleteUrineMonitoring);

module.exports = router;
