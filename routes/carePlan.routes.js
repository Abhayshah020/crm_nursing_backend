const express = require("express");
const controller = require("../controllers/carePlan.controller");
const { default: rateLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.post("/", rateLimiter, controller.createCarePlan);
router.get("/", rateLimiter, controller.getAllCarePlans);
router.get("/:id", rateLimiter, controller.getCarePlanById);
router.put("/:id", rateLimiter, controller.updateCarePlan);
router.delete("/:id", rateLimiter, controller.deleteCarePlan);

module.exports = router;
