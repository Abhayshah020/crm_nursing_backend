require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { sequelize } = require("../models");
const carePlanRoutes = require("../routes/carePlan.routes");
const dailyNoteRoutes = require("../routes/dailyNote.routes");

const app = express();

/**
 * Middlewares
 */
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/**
 * Routes
 */
app.use("/api/care-plans", carePlanRoutes);

app.use("/api/daily-notes", dailyNoteRoutes);
/**
 * Health check
 */
app.get("/health", (_, res) => {
    res.json({ status: "OK" });
});

/**
 * DB + Server start
 */
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL connected");

        await sequelize.sync(); // use migrations in prod
        console.log("✅ Models synced");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Unable to start server:", err);
        process.exit(1);
    }
})();
