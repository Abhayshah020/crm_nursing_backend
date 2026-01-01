const express = require("express");
const router = express.Router();
const uploadPatientImage = require("../middlewares/uploadPatientImage");
const patientController = require("../controllers/patient.controller");
const auth = require('../middlewares/auth.middleware');
const { rateLimiter } = require('../middlewares/rateLimiter');

router.use(rateLimiter);
router.use(auth);
router.post(
    "",
    uploadPatientImage.single("patientImage"),
    patientController.createPatient
);

router.get("", patientController.getPatients);
router.get("/all-with-profile", patientController.getAllPatientsWithProfileStatus);
router.get("/:id", patientController.getPatientById);

router.put(
    "/:id",
    uploadPatientImage.single("patientImage"),
    patientController.updatePatient
);

router.delete("/:id", patientController.deletePatient);


module.exports = router;
