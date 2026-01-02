const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CarePlanChronicDisease = sequelize.define(
    "CarePlanChronicDisease",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        carePlanId: {
            type: DataTypes.INTEGER,
        },

        diseaseName: {
            type: DataTypes.STRING,
        },

        careNeeds: {
            type: DataTypes.TEXT
        },

        goals: {
            type: DataTypes.TEXT
        },

        treatmentPlan: {
            type: DataTypes.TEXT
        },
        formData: {
            type: DataTypes.JSONB,
            defaultValue: {},
        },
    },
    {
        tableName: "care_plan_chronic_diseases",
        timestamps: true
    }
);

module.exports = CarePlanChronicDisease;
