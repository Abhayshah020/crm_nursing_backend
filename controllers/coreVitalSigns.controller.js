const { CoreVitalSigns } = require("../models");

// CREATE a new Core Vital Sign record
exports.createVitalSign = async (req, res) => {
    try {
        const data = await CoreVitalSigns.create(req.body);
        return res.status(201).json({
            message: "Core Vital Sign created successfully",
            data,
        });
    } catch (error) {
        console.error("Create Vital Sign Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET all Core Vital Signs (optionally by patient)
exports.getAllVitalSigns = async (req, res) => {
    try {
        const { page = 1, limit = 20, patientName, patientId } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (patientId) {
            whereClause.patientId = patientId;
        }
        if (patientName) {
            whereClause.patientName = patientName;
        }

        const records = await CoreVitalSigns.findAndCountAll({
            whereClause,
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            order: [["timestamp", "DESC"]],
        });

        return res.status(200).json({
            total: records.count,
            page: parseInt(page),
            pageSize: parseInt(limit),
            data: records.rows,
        });

    } catch (error) {
        console.error("Get All Vital Signs Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET a single Core Vital Sign by id
exports.getVitalSignById = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await CoreVitalSigns.findByPk(id);
        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }
        return res.json(record);
    } catch (error) {
        console.error("Get Vital Sign Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// UPDATE a Core Vital Sign by id
exports.updateVitalSign = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await CoreVitalSigns.findByPk(id);
        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }
        await record.update(req.body);
        return res.json({
            message: "Core Vital Sign updated successfully",
            data: record,
        });
    } catch (error) {
        console.error("Update Vital Sign Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE a Core Vital Sign by id
exports.deleteVitalSign = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }
        const { id } = req.params;
        const record = await CoreVitalSigns.findByPk(id);
        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }
        await record.destroy();
        return res.json({ message: "Core Vital Sign deleted successfully" });
    } catch (error) {
        console.error("Delete Vital Sign Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
