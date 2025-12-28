const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const NeuroGeneralObservation = sequelize.define(
    "NeuroGeneralObservation",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        patientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        levelOfConsciousness: {
            type: DataTypes.ENUM("Alert", "Drowsy", "Confused", "Unresponsive"),
            allowNull: true,
        },

        orientation: {
            type: DataTypes.ENUM("Person", "Place", "Time"),
            allowNull: true,
        },

        speech: {
            type: DataTypes.ENUM("Clear", "Slurred", "Difficult"),
            allowNull: true,
        },

        pupils: {
            type: DataTypes.ENUM("Equal", "Reactive", "Unequal"),
            allowNull: true,
        },

        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        staffName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        formData: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
        },
    },
    {
        tableName: "neuro_general_observations",
        timestamps: true, // createdAt & updatedAt
        indexes: [
            { fields: ["patientName"] },
            { fields: ["timestamp"] },
        ],
    }
);

module.exports = NeuroGeneralObservation;
