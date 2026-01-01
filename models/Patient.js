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
            unique: true,
        },

        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        address: {
            type: DataTypes.TEXT,
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
    },
    {
        tableName: "patients",
        timestamps: true,
        freezeTableName: true,
    }
);

module.exports = Patient;
