const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const carePlanRoutes = require("./carePlan.routes");
const dailyNoteRoutes = require("./dailyNote.routes");
const userAuthentication = require("./auth.routes");
const userManagement = require("./user.routes");
const patientRoutes = require("./patient.routes");
const coreVitalSignsRoutes = require("./coreVitalSigns.routes");
const painComfortAssessmentRoutes = require("./painComfortAssessment.routes");
const foodFluidIntakeRoutes = require("./foodFluidIntake.routes");
const neuroGeneralObservation = require("./neuroGeneralObservation.routes");
const skinCirculationRoutes = require("./skinCirculation.routes");
const hygieneCareRoutes = require("./generalHygieneCareRoutes");
const bowelChartRoutes = require("./bowelChartRoutes");
const urineRoutes = require("./urineMonitoringRoutes");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(helmet());
app.use(morgan("dev"));

app.use(cookieParser());

app.use(cors({
    origin: [
        "https://crmnursing.smsitsolutions.com.au",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(express.json());

app.use("/api/authentication", userAuthentication);

app.use("/api/care-plans", carePlanRoutes);

app.use("/api/daily-notes", dailyNoteRoutes);

app.use("/api/users", userManagement);

app.use("/api/patients", patientRoutes);

app.use("/api/core-vital-signs", coreVitalSignsRoutes);

app.use("/api/pain-comfort-assessments", painComfortAssessmentRoutes);

app.use("/api/food-fluid-intakes", foodFluidIntakeRoutes);

app.use("/api/neuro-general-observations", neuroGeneralObservation);

app.use("/api/skin-circulations", skinCirculationRoutes);

app.use("/api/general-hygiene-care", hygieneCareRoutes);

app.use("/api/bowel-charts", bowelChartRoutes);

app.use("/api/urine-monitoring", urineRoutes);

module.exports = app;