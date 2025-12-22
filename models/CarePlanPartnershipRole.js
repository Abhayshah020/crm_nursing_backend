const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CarePlanPartnershipRole = sequelize.define(
    "CarePlanPartnershipRole",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        carePlanId: {
            type: DataTypes.UUID,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
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
