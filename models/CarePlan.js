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

    clientName: {
      type: DataTypes.STRING,
    },

    dateOfBirth: {
      type: DataTypes.DATEONLY,
    },

    medicalDoctorName: {
      type: DataTypes.STRING
    },

    medicalDoctorContactNumber: {
      type: DataTypes.STRING
    },

    createdBy: {
      type: DataTypes.INTEGER,
    },

    status: {
      type: DataTypes.ENUM("draft", "completed", "locked"),
      defaultValue: "draft"
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
      { fields: ["clientName"] },
      { fields: ["dateOfBirth"] },
      { fields: ["status"] }
    ]
  }
);

module.exports = CarePlan;
