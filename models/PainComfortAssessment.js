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
        },

        patientName: {
            type: DataTypes.STRING,
        },

        painScore: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 10,
            },
        },

        painLocation: {
            type: DataTypes.STRING,
        },

        painDescription: {
            type: DataTypes.ENUM(
                "Sharp",
                "Dull",
                "Burning",
                "Constant"
            ),
        },

        painManagementRequired: {
            type: DataTypes.BOOLEAN,
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
        },

        staffName: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "pain_comfort_assessments",
        timestamps: false,
    }
);

module.exports = PainComfortAssessment;
