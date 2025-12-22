const sequelize = require("../config/database");

const CarePlan = require("./CarePlan");
const CarePlanChronicDisease = require("./CarePlanChronicDisease");
const CarePlanPartnershipRole = require("./CarePlanPartnershipRole");
const DailyNote = require("./dailyNote");
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
    DailyNote
};
