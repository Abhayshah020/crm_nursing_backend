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
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(helmet());
app.use(morgan("dev"));

app.use(cookieParser());

app.use(cors({
    origin: [
        "https://crmnursing.smsitsolutions.com.au/",
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

module.exports = app;