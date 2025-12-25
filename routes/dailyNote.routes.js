const express = require("express");
const router = express.Router();
const dailyNoteController = require("../controllers/dailyNote.controller");

const auth = require('../middlewares/auth.middleware');
const { rateLimiter } = require('../middlewares/rateLimiter');

router.use(rateLimiter);
router.use(auth);

router.post("/", dailyNoteController.createDailyNote);
router.get("/", dailyNoteController.getAllDailyNotes);
router.get("/:id", dailyNoteController.getDailyNoteById);
router.put("/:id", dailyNoteController.updateDailyNote);
router.delete("/:id", dailyNoteController.deleteDailyNote);

module.exports = router;
