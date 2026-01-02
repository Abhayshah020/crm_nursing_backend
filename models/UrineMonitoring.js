const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UrineMonitoring = sequelize.define(
    "UrineMonitoring",
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

        // Bladder Monitoring Period
        reasonForCharting: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: {},
        },

        // Urine Characteristics
        colour: {
            allowNull: true,
            type: DataTypes.ENUM("Pale Yellow", "Dark Yellow", "Amber", "Brown", "Red/Pink"),
        },
        clarity: {
            type: DataTypes.ENUM("Clear", "Cloudy", "Sediment Present"),
            allowNull: true,
        },
        odour: {
            type: DataTypes.ENUM("Normal", "Strong", "Offensive"),
            allowNull: true,
        },
        otherObservations: {
            type: DataTypes.JSONB,
            allowNull: true,
        },

        // Pain & Symptoms
        dysuria: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        frequency: {
            type: DataTypes.ENUM("Normal", "Increased", "Reduced"),
            allowNull: true,
        },
        urgency: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        nocturia: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        lowerAbdominalPain: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        painNotes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        // Continence & Devices
        continenceStatus: {
            type: DataTypes.ENUM("Continent", "Partially Continent", "Incontinent"),
            allowNull: true,
        },
        aidsUsed: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        catheterType: {
            type: DataTypes.ENUM("None", "IDC", "SPC"),
            allowNull: true,
        },
        siteCleanAndIntact: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        bagBelowBladder: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

        // Intake-Output Summary
        totalFluidIntake: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        totalUrineOutput: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        balance: {
            type: DataTypes.ENUM("Adequate", "Low", "Excessive"),
            allowNull: true,
        },

        // Escalation & Clinical Review
        redFlags: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: {},
        },
        rnGpManagerNotified: {
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
        tableName: "urine_monitorings",
        timestamps: true,
        indexes: [
            { fields: ["patientName"] },
            { fields: ["timestamp"] },
        ],
    }
);

module.exports = UrineMonitoring;
