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
            allowNull: false,
        },

        patientName: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: "skin_circulations",
        timestamps: true,
        indexes: [
            { fields: ["patientName"] },
            { fields: ["timestamp"] },
        ],
    }
);

module.exports = SkinCirculation;
