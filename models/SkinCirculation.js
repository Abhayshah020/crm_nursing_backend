const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SkinCirculation = sequelize.define(
    "SkinCirculation",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        patientId: {
            type: DataTypes.INTEGER,
        },

        patientName: {
            type: DataTypes.STRING,
        },

        skinColour: {
            type: DataTypes.ENUM("Normal", "Pale", "Flushed", "Cyanotic"),
            allowNull: true,
        },

        skinTemperature: {
            type: DataTypes.ENUM("Warm", "Cool", "Cold"),
            allowNull: true,
        },

        skinIntegrityIssues: {
            type: DataTypes.ENUM("Nil", "Bruising", "Wound", "Pressure Area"),
            allowNull: true,
        },

        capillaryRefill: {
            type: DataTypes.ENUM("<2 sec", ">2 sec"),
            allowNull: true,
        },

        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        staffName: {
            type: DataTypes.STRING,
        },

        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

        formData: {
            type: DataTypes.JSONB,
            defaultValue: {},
        },
    },
    {
        tableName: "skin_circulations",
        timestamps: true,
        indexes: [
            { fields: ["patientName"] },
            { fields: ["timestamp"] },
        ],
    }
);

module.exports = SkinCirculation;
