const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DailyNote = sequelize.define("DailyNote", {
    clientName: {
        type: DataTypes.STRING,
    },
    timeStamps: {
        type: DataTypes.STRING,
    },
    notes: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM("draft", "completed"),
        defaultValue: "draft"
    }
}, {
    tableName: "daily_notes",
    timestamps: true
});

module.exports = DailyNote;
