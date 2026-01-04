"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = [
      "bowel_charts",
      "care_plans",
      "core_vital_signs",
      "food_fluid_intakes",
      "general_hygiene_care",
      "neuro_general_observations",
      "pain_comfort_assessments",
      "patients",
      "skin_circulations",
      "urine_monitorings",
      // add more table names here
    ];

    for (const table of tables) {
      await queryInterface.addColumn(table, "date", {
        type: Sequelize.DATEONLY,
        allowNull: true,
      });

      await queryInterface.addColumn(table, "time", {
        type: Sequelize.TIME,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = [
      "bowel_charts",
      "care_plans",
      "core_vital_signs",
      "food_fluid_intakes",
      "general_hygiene_care",
      "neuro_general_observations",
      "pain_comfort_assessments",
      "patients",
      "skin_circulations",
      "urine_monitorings",
    ];

    for (const table of tables) {
      await queryInterface.removeColumn(table, "date");
      await queryInterface.removeColumn(table, "time");
    }
  },
};
