const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FoodFluidIntake = sequelize.define(
  "FoodFluidIntake",
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

    inputFluidsMl: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Fluid intake in milliliters"
    },

    foodDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    totalFluid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    fluidDetails: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    staffName: {
      type: DataTypes.STRING,
    },

    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    formData: {
      type: DataTypes.JSONB,
      defaultValue: {}
    }
  },
  {
    tableName: "food_fluid_intakes",
    timestamps: true,
    indexes: [
      { fields: ["patientName"] },
      { fields: ["timestamp"] }
    ]
  }
);

module.exports = FoodFluidIntake;
