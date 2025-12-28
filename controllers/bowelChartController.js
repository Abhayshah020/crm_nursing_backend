const { BowelChart } = require("../models");

// Create a new bowel chart record
exports.createBowelChart = async (req, res) => {
    try {
        const record = await BowelChart.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        console.error("Error creating bowel chart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all bowel chart records (with optional pagination)
exports.getAllBowelCharts = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const records = await BowelChart.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["timestamp", "DESC"]],
        });

        res.status(200).json(records);
    } catch (error) {
        console.error("Error fetching bowel charts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get single bowel chart by ID
exports.getBowelChartById = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await BowelChart.findByPk(id);
        if (!record) return res.status(404).json({ message: "Record not found" });

        res.status(200).json(record);
    } catch (error) {
        console.error("Error fetching bowel chart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a bowel chart by ID
exports.updateBowelChart = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await BowelChart.findByPk(id);
        if (!record) return res.status(404).json({ message: "Record not found" });

        await record.update(req.body);
        res.status(200).json(record);
    } catch (error) {
        console.error("Error updating bowel chart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a bowel chart by ID
exports.deleteBowelChart = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await BowelChart.findByPk(id);
        if (!record) return res.status(404).json({ message: "Record not found" });

        await record.destroy();
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        console.error("Error deleting bowel chart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
