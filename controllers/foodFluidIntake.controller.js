const { FoodFluidIntake } = require("../models"); // adjust path if needed

// CREATE a new Food & Fluid Intake record
exports.createIntake = async (req, res) => {
    try {
        const data = await FoodFluidIntake.create(req.body);
        return res.status(201).json({
            message: "Food & Fluid Intake record created successfully",
            data,
        });
    } catch (error) {
        console.error("Create Intake Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET all records with optional pagination
exports.getAllIntakes = async (req, res) => {
    try {
        const { page = 1, limit = 10, patientId } = req.query;
        const offset = (page - 1) * limit;
        const whereClause = {};

        if (patientId) {
            whereClause.patientId = patientId;
        }
        
        const records = await FoodFluidIntake.findAndCountAll({
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
        console.error("Get All Intakes Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET a single record by ID
exports.getIntakeById = async (req, res) => {
    try {
        const { id } = req.params;
        const intake = await FoodFluidIntake.findByPk(id);

        if (!intake) return res.status(404).json({ message: "Record not found" });

        return res.status(200).json(intake);
    } catch (error) {
        console.error("Get Intake By ID Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// UPDATE a record by ID
exports.updateIntake = async (req, res) => {
    try {
        const { id } = req.params;
        const intake = await FoodFluidIntake.findByPk(id);

        if (!intake) return res.status(404).json({ message: "Record not found" });

        await intake.update(req.body);

        return res.status(200).json({
            message: "Food & Fluid Intake record updated successfully",
            data: intake,
        });
    } catch (error) {
        console.error("Update Intake Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE a record by ID
exports.deleteIntake = async (req, res) => {
    try {
        const { id } = req.params;
        const intake = await FoodFluidIntake.findByPk(id);

        if (!intake) return res.status(404).json({ message: "Record not found" });

        await intake.destroy();

        return res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        console.error("Delete Intake Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
