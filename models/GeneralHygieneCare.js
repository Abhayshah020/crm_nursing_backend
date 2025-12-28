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
            allowNull: false,
        },

        patientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        sponge: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        tableName: "general_hygiene_care",
        timestamps: true,
        indexes: [
            { fields: ["patientName"] },
            { fields: ["timestamp"] },
        ],
    }
);

module.exports = GeneralHygieneCare;
