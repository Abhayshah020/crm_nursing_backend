const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define(
    "Patient",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
        },

        contact: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        age: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        date: {
            type: DataTypes.DATEONLY, // better than DATE if only date
            allowNull: true,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING, // stores image path
            allowNull: true,
        },

        details: {
            type: DataTypes.JSONB,
            defaultValue: {},
        },

        createdBy: {
            type: DataTypes.STRING,
        },

        createdById: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: "patients",
        timestamps: true,
        freezeTableName: true,
    }
);

module.exports = Patient;
