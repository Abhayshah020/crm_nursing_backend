const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DailyNote = sequelize.define("DailyNote", {
    clientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.INTEGER
    },
    status: { // draft or completed
        type: DataTypes.ENUM("draft", "completed"),
        defaultValue: "draft"
    }
}, {
    tableName: "daily_notes",
    timestamps: true
});

module.exports = DailyNote;
