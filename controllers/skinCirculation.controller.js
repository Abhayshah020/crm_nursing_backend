const { SkinCirculation } = require("../models");

// CREATE a new record
exports.createSkinCirculation = async (req, res) => {
    try {
        const data = await SkinCirculation.create(req.body);
        return res.status(201).json({
            message: "Skin & Circulation record created successfully",
            data,
        });
    } catch (error) {
        console.error("Create SkinCirculation Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET all records (with optional pagination)
exports.getAllSkinCirculations = async (req, res) => {
    try {
        const { page = 1, limit = 10, patientId } = req.query;
        const offset = (page - 1) * limit;
        const whereClause = {};
        if (patientId) {
            whereClause.patientId = patientId;
        }

        const records = await SkinCirculation.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["timestamp", "DESC"]],
        });

        return res.status(200).json({
            total: records.count,
            page: parseInt(page),
            pageSize: parseInt(limit),
            data: records.rows,
        });
    } catch (error) {
        console.error("Get SkinCirculations Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET single record by ID
exports.getSkinCirculationById = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await SkinCirculation.findByPk(id);

        if (!record) return res.status(404).json({ message: "Record not found" });

        return res.status(200).json(record);
    } catch (error) {
        console.error("Get SkinCirculation Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// UPDATE record by ID
exports.updateSkinCirculation = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await SkinCirculation.findByPk(id);

        if (!record) return res.status(404).json({ message: "Record not found" });

        await record.update(req.body);

        return res.status(200).json({
            message: "Skin & Circulation record updated successfully",
            data: record,
        });
    } catch (error) {
        console.error("Update SkinCirculation Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE record by ID
exports.deleteSkinCirculation = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }
        const { id } = req.params;
        const record = await SkinCirculation.findByPk(id);

        if (!record) return res.status(404).json({ message: "Record not found" });

        await record.destroy();

        return res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        console.error("Delete SkinCirculation Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
