const { UrineMonitoring } = require("../models");

function splitModelAndFormData(model, payload) {
    const modelFields = Object.keys(model.rawAttributes);

    const modelData = {};
    const formData = {};

    for (const key in payload) {
        if (modelFields.includes(key)) {
            modelData[key] = payload[key];
        } else {
            formData[key] = payload[key];
        }
    }

    return { modelData, formData };
}


// Create new urine monitoring record
exports.createUrineMonitoring = async (req, res) => {
    try {
        const { modelData, formData } = splitModelAndFormData(
            UrineMonitoring,
            req.body
        );

        const data = await UrineMonitoring.create({
            ...modelData,
            formData,
        });

        return res.status(201).json(data);
    } catch (error) {
        console.error("Error creating Urine Monitoring record:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};


// Get all urine monitoring records (with optional patient filter)
exports.getAllUrineMonitoring = async (req, res) => {
    try {
        const { page = 1, limit = 10, patientId } = req.query;
        const offset = (page - 1) * limit;
        const whereClause = {};
        if (patientId) {
            whereClause.patientId = patientId;
        }

        const records = await UrineMonitoring.findAndCountAll({
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
        console.error("Error fetching Urine Monitoring records:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

// Get a single record by ID
exports.getUrineMonitoringById = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await UrineMonitoring.findByPk(id);
        if (!record) return res.status(404).json({ message: "Record not found" });
        return res.status(200).json(record);
    } catch (error) {
        console.error("Error fetching Urine Monitoring record:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

// Update a record by ID
exports.updateUrineMonitoring = async (req, res) => {
    try {
        const { id } = req.params;

        const record = await UrineMonitoring.findByPk(id);
        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        const { modelData, formData } = splitModelAndFormData(
            UrineMonitoring,
            req.body
        );

        await record.update({
            ...modelData,
            formData: {
                ...(record.formData || {}),
                ...formData, // merge new extra fields
            },
        });

        return res.status(200).json(record);
    } catch (error) {
        console.error("Error updating Urine Monitoring record:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};


// Delete a record by ID
exports.deleteUrineMonitoring = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }

        const { id } = req.params;
        const record = await UrineMonitoring.findByPk(id);
        if (!record) return res.status(404).json({ message: "Record not found" });

        await record.destroy();
        return res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        console.error("Error deleting Urine Monitoring record:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};
