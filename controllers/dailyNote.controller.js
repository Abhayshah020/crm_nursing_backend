const {
    DailyNote,
    sequelize
} = require("../models");

/**
 * CREATE Daily Note
 */
exports.createDailyNote = async (req, res) => {
    try {
        const { status = "draft", ...other } = req.body;
        const note = await DailyNote.create({ ...other, status });
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * GET ALL Daily Notes
 */
exports.getAllDailyNotes = async (req, res) => {
    try {
        const { page = 1, limit = 10, patientId } = req.query;
        const offset = (page - 1) * limit;
        const whereClause = {};

        if (patientId) {
            whereClause.patientId = patientId;
        }

        const records = await DailyNote.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["timestamp", "DESC"]],
        });

        return res.status(200).json({
            total: records.count,
            page: Math.ceil(records.count / limit),
            pageSize: parseInt(limit),
            data: records.rows,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * GET Daily Note BY ID
 */
exports.getDailyNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await DailyNote.findByPk(id);
        if (!note) return res.status(404).json({ error: "Daily Note not found" });
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * UPDATE Daily Note
 */
exports.updateDailyNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await DailyNote.findByPk(id);
        if (!note) return res.status(404).json({ error: "Daily Note not found" });

        await note.update(req.body);
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * DELETE Daily Note
 */
exports.deleteDailyNote = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }
        const { id } = req.params;
        const note = await DailyNote.findByPk(id);
        if (!note) return res.status(404).json({ error: "Daily Note not found" });

        await note.destroy();
        res.json({ message: "Daily Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
