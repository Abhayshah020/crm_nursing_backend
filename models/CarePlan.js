const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CarePlan = sequelize.define(
  "CarePlan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    patientId: {
      type: DataTypes.INTEGER,
    },
    patientName: {
      type: DataTypes.STRING,
    },


    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: true
    },

    medicalDoctorName: {
      type: DataTypes.STRING,
      allowNull: true
    },

    medicalDoctorContactNumber: {
      type: DataTypes.STRING,
      allowNull: true
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
    status: {
      type: DataTypes.ENUM("draft", "completed", "locked"),
      defaultValue: "draft"
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    formData: {
      type: DataTypes.JSONB,
      defaultValue: {}
    }
  },
  {
    tableName: "care_plans",
    timestamps: true,
    indexes: [
      { fields: ["dateOfBirth"] },
      { fields: ["status"] }
    ]
  }
);

module.exports = CarePlan;
