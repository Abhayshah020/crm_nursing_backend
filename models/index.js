const sequelize = require("../config/database");

const CarePlan = require("./CarePlan");
const CarePlanChronicDisease = require("./CarePlanChronicDisease");
const CarePlanPartnershipRole = require("./CarePlanPartnershipRole");
const DailyNote = require("./DailyNote");
const User = require("./User");
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
    foreignKey: "carePlanId"
});

CarePlan.hasMany(CarePlanPartnershipRole, {
    foreignKey: "carePlanId",
    as: "partnershipRoles",
    onDelete: "CASCADE"
});

CarePlanPartnershipRole.belongsTo(CarePlan, {
    foreignKey: "carePlanId"
});

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
    UrineMonitoring
};
