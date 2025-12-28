const { GeneralHygieneCare } = require("../models");

// Get all hygiene care records
exports.getAllHygieneCare = async (req, res) => {
    try {
        const records = await GeneralHygieneCare.findAll({
            order: [["timestamp", "DESC"]],
        });
        res.status(200).json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch records" });
    }
};

// Get a single record by ID
exports.getHygieneCareById = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await GeneralHygieneCare.findByPk(id);
        if (!record) return res.status(404).json({ error: "Record not found" });
        res.status(200).json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch record" });
    }
};

// Create a new record
exports.createHygieneCare = async (req, res) => {
    try {
        const newRecord = await GeneralHygieneCare.create(req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create record" });
    }
};

// Update an existing record
exports.updateHygieneCare = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await GeneralHygieneCare.findByPk(id);
        if (!record) return res.status(404).json({ error: "Record not found" });

        await record.update(req.body);
        res.status(200).json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update record" });
    }
};

// Delete a record
exports.deleteHygieneCare = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await GeneralHygieneCare.findByPk(id);
        if (!record) return res.status(404).json({ error: "Record not found" });

        await record.destroy();
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete record" });
    }
};
