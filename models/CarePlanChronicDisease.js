const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CarePlanChronicDisease = sequelize.define(
    "CarePlanChronicDisease",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        carePlanId: {
            type: DataTypes.UUID,
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
        }
    },
    {
        tableName: "care_plan_chronic_diseases",
        timestamps: true
    }
);

module.exports = CarePlanChronicDisease;
