const express = require("express");
const router = express.Router();
const controller = require("../controllers/generalHygieneCareController");
const auth = require('../middlewares/auth.middleware');
const { rateLimiter } = require('../middlewares/rateLimiter');

router.use(rateLimiter);
router.use(auth);
// CRUD routes
router.get("/", controller.getAllHygieneCare);          // Get all records
router.get("/:id", controller.getHygieneCareById);     // Get single record
router.post("/", controller.createHygieneCare);        // Create record
router.put("/:id", controller.updateHygieneCare);      // Update record
router.delete("/:id", controller.deleteHygieneCare);   // Delete record

module.exports = router;
