const { UrineMonitoring } = require("../models");

// Create new urine monitoring record
exports.createUrineMonitoring = async (req, res) => {
    try {
        const data = await UrineMonitoring.create({
            ...req.body,
            formData: req.body,
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
        const { patientId } = req.query;
        const query = patientId ? { where: { patientId } } : {};
        const records = await UrineMonitoring.findAll(query);
        return res.status(200).json(records);
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
        if (!record) return res.status(404).json({ message: "Record not found" });

        await record.update({ ...req.body, formData: req.body });
        return res.status(200).json(record);
    } catch (error) {
        console.error("Error updating Urine Monitoring record:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

// Delete a record by ID
exports.deleteUrineMonitoring = async (req, res) => {
    try {
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
