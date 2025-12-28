const express = require("express");
const router = express.Router();
const bowelChartController = require("../controllers/bowelChartController");

// CRUD routes
router.post("/", bowelChartController.createBowelChart);
router.get("/", bowelChartController.getAllBowelCharts);
router.get("/:id", bowelChartController.getBowelChartById);
router.put("/:id", bowelChartController.updateBowelChart);
router.delete("/:id", bowelChartController.deleteBowelChart);

module.exports = router;
