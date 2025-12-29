const express = require("express");
const router = express.Router();
const uploadPatientImage = require("../middlewares/uploadPatientImage");
const patientController = require("../controllers/patient.controller");

router.post(
    "",
    uploadPatientImage.single("patientImage"),
    patientController.createPatient
);

router.get("", patientController.getPatients);
router.get("/:id", patientController.getPatientById);

router.put(
    "/:id",
    uploadPatientImage.single("patientImage"),
    patientController.updatePatient
);

router.delete("/:id", patientController.deletePatient);

module.exports = router;
