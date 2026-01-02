const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DailyNote = sequelize.define("DailyNote", {
    patientId: {
        type: DataTypes.INTEGER,
    },
    patientName: {
        type: DataTypes.STRING,
    },

    timestamp: {
        type: DataTypes.DATE,
    },
    notes: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.STRING,
    },
    time: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM("draft", "completed"),
        defaultValue: "draft"
    },
    createdBy: {
        type: DataTypes.STRING,
    },
    formData: {
        type: DataTypes.JSONB,
        defaultValue: {},
    },
    createdById: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: "daily_notes",
    timestamps: true
});

module.exports = DailyNote;
