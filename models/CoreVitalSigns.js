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
        type: DataTypes.STRING,
        allowNull: true,
    },

    temperatureNote: {
        type: DataTypes.ENUM("Normal", "Monitor", "Escalate"),
        allowNull: true,
    },

    pulseRate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pulseNote: {
        type: DataTypes.ENUM("Regular", "Irregular"),
        allowNull: true,
    },

    bloodPressureSystolic: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bloodPressureDiastolic: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    bloodPressurePosition: {
        type: DataTypes.ENUM("Sitting", "Standing"),
        allowNull: true,
    },

    respiratoryRate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    respiratoryNote: {
        type: DataTypes.ENUM("Normal", "Laboured"),
        allowNull: true,
    },

    oxygenSaturation: {
        type: DataTypes.STRING,
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

    createdBy: {
        type: DataTypes.STRING,
    },

    createdById: {
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.DATEONLY, // better than DATE if only date
        allowNull: true,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    formData: {
        type: DataTypes.JSONB,
        defaultValue: {},
    },
}, {
    tableName: "core_vital_signs",
    timestamps: false,
});

module.exports = CoreVitalSigns;
