const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CarePlanPartnershipRole = sequelize.define(
    "CarePlanPartnershipRole",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        carePlanId: {
            type: DataTypes.INTEGER,
        },

        name: {
            type: DataTypes.STRING,
        },

        relationship: {
            type: DataTypes.STRING
        },

        details: {
            type: DataTypes.TEXT
        },

        responsibilities: {
            type: DataTypes.TEXT
        }
    },
    {
        tableName: "care_plan_partnership_roles",
        timestamps: true
    }
);

module.exports = CarePlanPartnershipRole;
