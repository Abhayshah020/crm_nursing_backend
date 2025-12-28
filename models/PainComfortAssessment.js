const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // adjust path as needed

const PainComfortAssessment = sequelize.define(
    "PainComfortAssessment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        patientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        painScore: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 10,
            },
        },

        painLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        painDescription: {
            type: DataTypes.ENUM(
                "Sharp",
                "Dull",
                "Burning",
                "Constant"
            ),
            allowNull: false,
        },

        painManagementRequired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        actionTaken: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

        staffId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        staffName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "pain_comfort_assessments",
        timestamps: false,
    }
);

module.exports = PainComfortAssessment;
