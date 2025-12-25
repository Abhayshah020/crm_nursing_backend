const express = require("express");
const controller = require("../controllers/carePlan.controller");
const auth = require('../middlewares/auth.middleware');
const { rateLimiter } = require('../middlewares/rateLimiter');
const router = express.Router();

router.use(rateLimiter);
router.use(auth);


router.post("/", controller.createCarePlan);
router.get("/", controller.getAllCarePlans);
router.get("/:id", controller.getCarePlanById);
router.put("/:id", controller.updateCarePlan);
router.delete("/:id", controller.deleteCarePlan);

module.exports = router;
