const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GeneralHygieneCare = sequelize.define(
    "GeneralHygieneCare",
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

        sponge: {
            type: DataTypes.BOOLEAN,
        },

        shower: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        hairWash: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        oralCare: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        teethCleaned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        denturesCleaned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        bedBath: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        createdBy: {
            type: DataTypes.STRING,
        },

        createdById: {
            type: DataTypes.INTEGER,
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
        tableName: "general_hygiene_care",
        timestamps: true,
        indexes: [
            { fields: ["patientName"] },
            { fields: ["timestamp"] },
        ],
    }
);

module.exports = GeneralHygieneCare;
