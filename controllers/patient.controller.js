const Patient = require("../models/Patient");
const fs = require("fs");
const path = require("path");

// Create patient
exports.createPatient = async (req, res) => {
    try {
        const { name, contact, email, age, address, details } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const imagePath = req.file
            ? `/uploads/patients/${req.file.filename}`
            : null;

        const patient = await Patient.create({
            name,
            contact,
            email,
            age,
            address,
            details,
            image: imagePath,
        });

        res.status(201).json({ message: "Patient created", patient });
    } catch (error) {
        console.error("Create Patient Error:", error);
        res.status(500).json({ message: "Failed to create patient" });
    }
};

// Get all patients
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (error) {
        console.error("Get Patients Error:", error);
        res.status(500).json({ message: "Failed to fetch patients" });
    }
};

// Get single patient
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json(patient);
    } catch (error) {
        console.error("Get Patient Error:", error);
        res.status(500).json({ message: "Failed to fetch patient" });
    }
};

// Update patient
exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contact, email, age, address, details } = req.body;

        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // If new image uploaded → delete old image
        if (req.file && patient.image) {
            const oldPath = path.join(
                __dirname,
                "..",
                patient.image
            );
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        const imagePath = req.file
            ? `/uploads/patients/${req.file.filename}`
            : patient.image;

        await patient.update({
            name,
            contact,
            email,
            age,
            address,
            details,
            image: imagePath,
        });

        res.json({ message: "Patient updated", patient });
    } catch (error) {
        console.error("Update Patient Error:", error);
        res.status(500).json({ message: "Failed to update patient" });
    }
};

// Delete patient
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Delete image from storage
        if (patient.image) {
            const imgPath = path.join(__dirname, "..", patient.image);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        await patient.destroy();
        res.json({ message: "Patient deleted" });
    } catch (error) {
        console.error("Delete Patient Error:", error);
        res.status(500).json({ message: "Failed to delete patient" });
    }
};
