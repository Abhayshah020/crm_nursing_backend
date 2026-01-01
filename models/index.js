const sequelize = require("../config/database");

const CarePlan = require("./CarePlan");
const CarePlanChronicDisease = require("./CarePlanChronicDisease");
const CarePlanPartnershipRole = require("./CarePlanPartnershipRole");
const DailyNote = require("./DailyNote");
const User = require("./User");
const Patient = require("./Patient");
const CoreVitalSigns = require("./CoreVitalSigns");
const PainComfortAssessment = require("./PainComfortAssessment");
const FoodFluidIntake = require("./FoodFluidIntake");
const NeuroGeneralObservation = require("./NeuroGeneralObservation");
const SkinCirculation = require("./SkinCirculation");
const GeneralHygieneCare = require("./GeneralHygieneCare");
const BowelChart = require("./BowelChart");
const UrineMonitoring = require("./UrineMonitoring");

/**
 * Associations
 */
CarePlan.hasMany(CarePlanChronicDisease, {
  foreignKey: "carePlanId",
  as: "chronicDiseases",
  onDelete: "CASCADE"
});

CarePlanChronicDisease.belongsTo(CarePlan, {
  foreignKey: "carePlanId",
});


CarePlan.hasMany(CarePlanPartnershipRole, {
  foreignKey: "carePlanId",
  as: "partnershipRoles",
  onDelete: "CASCADE"
});

CarePlanPartnershipRole.belongsTo(CarePlan, {
  foreignKey: "carePlanId"
});

/**
 * Patient ↔ One-to-One Medical Records
 */
Patient.hasOne(CarePlan, { foreignKey: "patientId", as: "carePlan" });
CarePlan.belongsTo(Patient, { foreignKey: "patientId" });

Patient.hasOne(DailyNote, { foreignKey: "patientId", as: "dailyNote" });
DailyNote.belongsTo(Patient, { foreignKey: "patientId" });

Patient.hasOne(CoreVitalSigns, { foreignKey: "patientId", as: "coreVitalSigns" });
CoreVitalSigns.belongsTo(Patient, { foreignKey: "patientId" });

Patient.hasOne(PainComfortAssessment, { foreignKey: "patientId", as: "painComfortAssessment" });
PainComfortAssessment.belongsTo(Patient, { foreignKey: "patientId" });

Patient.hasOne(FoodFluidIntake, { foreignKey: "patientId", as: "foodFluidIntake" });
FoodFluidIntake.belongsTo(Patient, { foreignKey: "patientId" });

Patient.hasOne(NeuroGeneralObservation, { foreignKey: "patientId", as: "neuroGeneralObservation" });
NeuroGeneralObservation.belongsTo(Patient, { foreignKey: "patientId" });

Patient.hasOne(SkinCirculation, { foreignKey: "patientId", as: "skinCirculation" });
SkinCirculation.belongsTo(Patient, { foreignKey: "patientId" });

Patient.hasOne(GeneralHygieneCare, { foreignKey: "patientId", as: "generalHygieneCare" });
GeneralHygieneCare.belongsTo(Patient, { foreignKey: "patientId" });

Patient.hasOne(BowelChart, { foreignKey: "patientId", as: "bowelChart" });
BowelChart.belongsTo(Patient, { foreignKey: "patientId" });

Patient.hasOne(UrineMonitoring, { foreignKey: "patientId", as: "urineMonitoring" });
UrineMonitoring.belongsTo(Patient, { foreignKey: "patientId" });


module.exports = {
  sequelize,
  CarePlan,
  CarePlanChronicDisease,
  CarePlanPartnershipRole,
  DailyNote,
  User,
  CoreVitalSigns,
  PainComfortAssessment,
  FoodFluidIntake,
  NeuroGeneralObservation,
  SkinCirculation,
  GeneralHygieneCare,
  BowelChart,
  UrineMonitoring,
  Patient
};
