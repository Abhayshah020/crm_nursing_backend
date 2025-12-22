const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CarePlan = sequelize.define(
  "CarePlan",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    clientName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    medicalDoctorName: {
      type: DataTypes.STRING
    },

    medicalDoctorContactNumber: {
      type: DataTypes.STRING
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM("draft", "completed", "locked"),
      defaultValue: "draft"
    },

    formData: {
      type: DataTypes.JSONB,
      allowNull: false,
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
