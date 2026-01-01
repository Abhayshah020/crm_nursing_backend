const express = require("express");
const router = express.Router();
const skinCirculationController = require("../controllers/skinCirculation.controller");
const auth = require('../middlewares/auth.middleware');
const { rateLimiter } = require('../middlewares/rateLimiter');

router.use(rateLimiter);
router.use(auth);
// Create a new record
router.post("/", skinCirculationController.createSkinCirculation);

// Get all records (with pagination)
router.get("/", skinCirculationController.getAllSkinCirculations);

// Get single record by ID
router.get("/:id", skinCirculationController.getSkinCirculationById);

// Update record by ID
router.put("/:id", skinCirculationController.updateSkinCirculation);

// Delete record by ID
router.delete("/:id", skinCirculationController.deleteSkinCirculation);

module.exports = router;
