const express = require("express");
const router = express.Router();
const controller = require("../controllers/neuroGeneralObservation.controller");
const auth = require('../middlewares/auth.middleware');
const { rateLimiter } = require('../middlewares/rateLimiter');

router.use(rateLimiter);
router.use(auth);
// CRUD routes
router.post("/", controller.createObservation);          // Create
router.get("/", controller.getObservations);            // List all with pagination
router.get("/:id", controller.getObservationById);      // Get by ID
router.put("/:id", controller.updateObservation);       // Update
router.delete("/:id", controller.deleteObservation);    // Delete

module.exports = router;
