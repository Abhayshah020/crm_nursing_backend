const { PainComfortAssessment } = require("../models");

/**
 * CREATE
 */
exports.createPainAssessment = async (req, res) => {
    try {
        const data = await PainComfortAssessment.create(req.body);

        return res.status(201).json({
            message: "Pain & Comfort Assessment created successfully",
            data,
        });
    } catch (error) {
        console.error("Create Pain Assessment Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

/**
 * GET ALL
 */
exports.getAllPainAssessments = async (req, res) => {
    try {
        const { page = 1, limit = 10, patientId } = req.query;
        const offset = (page - 1) * limit;
        const whereClause = {};

        if (patientId) {
            whereClause.patientId = patientId;
        }

        const records = await PainComfortAssessment.findAndCountAll({
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
        console.error("Get All Pain Assessments Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

/**
 * GET BY ID
 */
exports.getPainAssessmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await PainComfortAssessment.findByPk(id);

        if (!data) {
            return res.status(404).json({
                message: "Pain & Comfort Assessment not found",
            });
        }

        return res.status(200).json({
            message: "Pain & Comfort Assessment fetched successfully",
            data,
        });
    } catch (error) {
        console.error("Get Pain Assessment Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

/**
 * UPDATE
 */
exports.updatePainAssessment = async (req, res) => {
    try {
        const { id } = req.params;

        const record = await PainComfortAssessment.findByPk(id);

        if (!record) {
            return res.status(404).json({
                message: "Pain & Comfort Assessment not found",
            });
        }

        await record.update(req.body);

        return res.status(200).json({
            message: "Pain & Comfort Assessment updated successfully",
            data: record,
        });
    } catch (error) {
        console.error("Update Pain Assessment Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

/**
 * DELETE
 */
exports.deletePainAssessment = async (req, res) => {
    try {
        const { id } = req.params;

        const record = await PainComfortAssessment.findByPk(id);

        if (!record) {
            return res.status(404).json({
                message: "Pain & Comfort Assessment not found",
            });
        }

        await record.destroy();

        return res.status(200).json({
            message: "Pain & Comfort Assessment deleted successfully",
        });
    } catch (error) {
        console.error("Delete Pain Assessment Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
