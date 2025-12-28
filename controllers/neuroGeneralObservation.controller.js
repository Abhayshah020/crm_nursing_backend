const { NeuroGeneralObservation } = require("../models"); // adjust path as needed

// CREATE a new observation
exports.createObservation = async (req, res) => {
    try {
        const data = await NeuroGeneralObservation.create(req.body);
        return res.status(201).json({
            message: "Observation created successfully",
            data,
        });
    } catch (error) {
        console.error("Create Observation Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET all observations with optional pagination
exports.getObservations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await NeuroGeneralObservation.findAndCountAll({
            order: [["timestamp", "DESC"]],
            limit,
            offset,
        });

        return res.status(200).json({
            data: rows,
            pagination: {
                total: count,
                page,
                pages: Math.ceil(count / limit),
            },
        });
    } catch (error) {
        console.error("Get Observations Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET single observation by ID
exports.getObservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const observation = await NeuroGeneralObservation.findByPk(id);

        if (!observation) {
            return res.status(404).json({ message: "Observation not found" });
        }

        return res.status(200).json({ data: observation });
    } catch (error) {
        console.error("Get Observation Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// UPDATE an observation
exports.updateObservation = async (req, res) => {
    try {
        const { id } = req.params;
        const observation = await NeuroGeneralObservation.findByPk(id);

        if (!observation) {
            return res.status(404).json({ message: "Observation not found" });
        }

        await observation.update(req.body);
        return res.status(200).json({
            message: "Observation updated successfully",
            data: observation,
        });
    } catch (error) {
        console.error("Update Observation Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE an observation
exports.deleteObservation = async (req, res) => {
    try {
        const { id } = req.params;
        const observation = await NeuroGeneralObservation.findByPk(id);

        if (!observation) {
            return res.status(404).json({ message: "Observation not found" });
        }

        await observation.destroy();
        return res.status(200).json({ message: "Observation deleted successfully" });
    } catch (error) {
        console.error("Delete Observation Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
