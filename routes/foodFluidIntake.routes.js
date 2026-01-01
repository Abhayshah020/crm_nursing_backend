const express = require("express");
const router = express.Router();
const intakeController = require("../controllers/foodFluidIntake.controller");
const auth = require('../middlewares/auth.middleware');
const { rateLimiter } = require('../middlewares/rateLimiter');

router.use(rateLimiter);
router.use(auth);
// CRUD routes
router.post("/", intakeController.createIntake);
router.get("/", intakeController.getAllIntakes);
router.get("/:id", intakeController.getIntakeById);
router.put("/:id", intakeController.updateIntake);
router.delete("/:id", intakeController.deleteIntake);

module.exports = router;
