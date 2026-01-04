const fs = require("fs");
const path = require("path");
const { signImage } = require("../utils/signImage");

const {
    Patient,
    CarePlan,
    DailyNote,
    CoreVitalSigns,
    PainComfortAssessment,
    FoodFluidIntake,
    NeuroGeneralObservation,
    SkinCirculation,
    GeneralHygieneCare,
    BowelChart,
    UrineMonitoring,
} = require("../models");

// Create patient
exports.createPatient = async (req, res) => {
    try {
        const {
            name,
            contact,
            email,
            age,
            address,
            details,
            createdBy,
            createdById,
            date,
            time,
        } = req.body;

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
            createdBy,
            createdById,
            date,
            time,
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
        const { page = 1, limit = 10, patientId } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};
        if (patientId) {
            whereClause.id = patientId;
        }

        const records = await Patient.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["createdAt", "DESC"]],
        });

        // 🔐 Secure image mapping
        const data = records.rows.map((patient) => {
            const plain = patient.toJSON();

            return {
                ...plain,
                image: plain.image
                    ? `/uploads/signed/${signImage(plain.image, req.user.id)}`
                    : null,
            };
        });

        return res.status(200).json({
            total: records.count,
            page: Math.ceil(records.count / limit),
            pageSize: parseInt(limit),
            data,
        });
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

        const plain = patient.toJSON();
        const data = {
            ...plain,
            image: plain.image
                ? `/uploads/signed/${signImage(plain.image, req.user.id)}`
                : null,
        };

        return res.status(200).json({
            data,
        });

    } catch (error) {
        console.error("Get Patient Error:", error);
        res.status(500).json({ message: "Failed to fetch patient" });
    }
};

// Update patient
exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            contact,
            email,
            age,
            address,
            details,
            createdBy,
            createdById,
            date,
            time,
        } = req.body;

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
            createdBy,
            createdById,
            image: imagePath,
            date,
            time,
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
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }

        const patient = await Patient.findByPk(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Delete patient image
        if (patient.image) {
            const imgPath = path.join(__dirname, "..", patient.image);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        // Delete all related records
        await Promise.all([
            CarePlan.destroy({ where: { patientId: patient.id } }),
            DailyNote.destroy({ where: { patientId: patient.id } }),
            CoreVitalSigns.destroy({ where: { patientId: patient.id } }),
            PainComfortAssessment.destroy({ where: { patientId: patient.id } }),
            FoodFluidIntake.destroy({ where: { patientId: patient.id } }),
            NeuroGeneralObservation.destroy({ where: { patientId: patient.id } }),
            SkinCirculation.destroy({ where: { patientId: patient.id } }),
            GeneralHygieneCare.destroy({ where: { patientId: patient.id } }),
            BowelChart.destroy({ where: { patientId: patient.id } }),
            UrineMonitoring.destroy({ where: { patientId: patient.id } }),
        ]);

        // Finally delete the patient
        await patient.destroy();

        return res.json({ message: "Patient and all related data deleted successfully" });
    } catch (error) {
        console.error("Delete Patient Error:", error);
        return res.status(500).json({ message: "Failed to delete patient", error });
    }
};

exports.getAllPatientsWithProfileStatus = async (req, res) => {
    try {
        const { page = 1, limit = 10, patientId } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};
        if (patientId) {
            whereClause.id = patientId;
        }
        const records = await Patient.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["createdAt", "DESC"]],
        });

        const data = records.rows.map((patient) => {
            const plain = patient.toJSON();
            return {
                ...plain,
                image: plain.image
                    ? `/uploads/signed/${signImage(plain.image, req.user.id)}`
                    : null,
            };
        });


        return res.status(200).json({
            total: records.count,
            page: Math.ceil(records.count / limit),
            pageSize: parseInt(limit),
            data,
        });

    } catch (error) {
        console.error("Get All Patients With Profile Status Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




