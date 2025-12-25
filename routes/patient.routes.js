const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const auth = require('../middlewares/auth.middleware');
const { rateLimiter } = require('../middlewares/rateLimiter');

router.use(rateLimiter);
router.use(auth);

// CRUD routes
router.post("/", patientController.createPatient);
router.get("/", patientController.getPatients);
router.get("/:id", patientController.getPatientById);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);

module.exports = router;
