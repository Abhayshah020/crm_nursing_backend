const express = require("express");
const router = express.Router();
const dailyNoteController = require("../controllers/dailyNote.controller");
const { default: rateLimiter } = require("../middlewares/rateLimiter");

router.post("/", rateLimiter, dailyNoteController.createDailyNote);
router.get("/", rateLimiter, dailyNoteController.getAllDailyNotes);
router.get("/:id", rateLimiter, dailyNoteController.getDailyNoteById);
router.put("/:id", rateLimiter, dailyNoteController.updateDailyNote);
router.delete("/:id", rateLimiter, dailyNoteController.deleteDailyNote);

module.exports = router;
