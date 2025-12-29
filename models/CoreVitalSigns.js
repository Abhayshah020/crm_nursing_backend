const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // adjust path as needed

const CoreVitalSigns = sequelize.define("CoreVitalSigns", {
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

    temperature: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },

    temperatureNote: {
        type: DataTypes.ENUM("Normal", "Monitor", "Escalate"),
        allowNull: true,
    },

    pulseRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pulseNote: {
        type: DataTypes.ENUM("Regular", "Irregular"),
        allowNull: true,
    },

    bloodPressureSystolic: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    bloodPressureDiastolic: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    bloodPressurePosition: {
        type: DataTypes.ENUM("Sitting", "Standing"),
        allowNull: true,
    },

    respiratoryRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    respiratoryNote: {
        type: DataTypes.ENUM("Normal", "Laboured"),
        allowNull: true,
    },

    oxygenSaturation: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    oxygenNote: {
        type: DataTypes.ENUM("On Air", "On O₂"),
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

}, {
    tableName: "core_vital_signs",
    timestamps: false,
});

module.exports = CoreVitalSigns;
