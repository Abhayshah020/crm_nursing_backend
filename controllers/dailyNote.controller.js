const {
  DailyNote,
  sequelize
} = require("../models");

/**
 * CREATE Daily Note
 */
exports.createDailyNote = async (req, res) => {
    try {
        const { clientName, date, notes, status = "draft", createdBy } = req.body;
        const note = await DailyNote.create({ clientName, date, notes, status, createdBy });
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
        const notes = await DailyNote.findAll({ order: [["date", "DESC"]] });
        res.json(notes);
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
        const { clientName, date, notes, status } = req.body;

        const note = await DailyNote.findByPk(id);
        if (!note) return res.status(404).json({ error: "Daily Note not found" });

        await note.update({ clientName, date, notes, status });
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
        const { id } = req.params;
        const note = await DailyNote.findByPk(id);
        if (!note) return res.status(404).json({ error: "Daily Note not found" });

        await note.destroy();
        res.json({ message: "Daily Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
