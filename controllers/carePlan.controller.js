const {
  CarePlan,
  CarePlanChronicDisease,
  CarePlanPartnershipRole,
  sequelize
} = require("../models");

/**
 * CREATE Care Plan
 */
exports.createCarePlan = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      patientId,
      patientName,
      dateOfBirth,
      medicalDoctorName,
      medicalDoctorContactNumber,
      status = "draft",
      formData = {},
      chronicDiseases = [],
      partnershipRoles = [],
      createdBy,
      createdById,
      date,
      time,
      timestamp,
    } = req.body;

    // Create main care plan
    const carePlan = await CarePlan.create({
      patientId,
      patientName,
      dateOfBirth,
      medicalDoctorName,
      medicalDoctorContactNumber,
      status,
      createdBy,
      createdById,
      formData,
      date,
      time,
      timestamp,
    }, { transaction: t });

    // Create associated chronic diseases
    if (chronicDiseases.length > 0) {
      const chronicData = chronicDiseases.map(cd => ({
        ...cd,
        carePlanId: carePlan.id
      }));
      await CarePlanChronicDisease.bulkCreate(chronicData, { transaction: t });
    }

    // Create associated partnership roles
    if (partnershipRoles.length > 0) {
      const roleData = partnershipRoles.map(role => ({
        ...role,
        carePlanId: carePlan.id
      }));
      await CarePlanPartnershipRole.bulkCreate(roleData, { transaction: t });
    }

    await t.commit();

    // Fetch full care plan with associations
    const result = await CarePlan.findByPk(carePlan.id, {
      include: [
        { model: CarePlanChronicDisease, as: "chronicDiseases" },
        { model: CarePlanPartnershipRole, as: "partnershipRoles" }
      ]
    });

    res.status(201).json(result);

  } catch (err) {
    if (!t.finished) await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET ALL Care Plans
 */
exports.getAllCarePlans = async (req, res) => {
  try {
    const { page = 1, limit = 20, patientId } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = {};

    // ✅ Apply filter only if patientId is provided
    if (patientId) {
      whereClause.patientId = patientId;
    }

    const records = await CarePlan.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        { model: CarePlanChronicDisease, as: "chronicDiseases" },
        { model: CarePlanPartnershipRole, as: "partnershipRoles" }
      ],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      total: records.count,
      page: Math.ceil(records.count / limit),
      pageSize: parseInt(limit),
      data: records.rows,
    });
  } catch (err) {
    console.error("Get Care Plans Error:", err);
    res.status(500).json({ error: err.message });
  }
};


/**
 * GET Care Plan by ID
 */
exports.getCarePlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const carePlan = await CarePlan.findByPk(id, {
      include: [
        { model: CarePlanChronicDisease, as: "chronicDiseases" },
        { model: CarePlanPartnershipRole, as: "partnershipRoles" }
      ]
    });

    if (!carePlan) return res.status(404).json({ error: "CarePlan not found" });

    res.json(carePlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * UPDATE Care Plan
 * Handles formData, chronicDiseases, partnershipRoles
 */
exports.updateCarePlan = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const {
      patientId,
      patientName,
      dateOfBirth,
      medicalDoctorName,
      medicalDoctorContactNumber,
      status,
      formData,
      createdBy,
      createdById,
      chronicDiseases = [],
      partnershipRoles = []
    } = req.body;

    const carePlan = await CarePlan.findByPk(id, { transaction: t });
    if (!carePlan) return res.status(404).json({ error: "CarePlan not found" });

    // Update main care plan
    await carePlan.update({
      patientId,
      patientName,
      dateOfBirth,
      medicalDoctorName,
      medicalDoctorContactNumber,
      status,
      createdBy,
      createdById,
      formData
    }, { transaction: t });

    // Delete old chronic diseases and insert new ones
    await CarePlanChronicDisease.destroy({ where: { carePlanId: id }, transaction: t });
    if (chronicDiseases.length > 0) {
      const chronicData = chronicDiseases.map(cd => ({ ...cd, carePlanId: id }));
      await CarePlanChronicDisease.bulkCreate(chronicData, { transaction: t });
    }

    // Delete old partnership roles and insert new ones
    await CarePlanPartnershipRole.destroy({ where: { carePlanId: id }, transaction: t });
    if (partnershipRoles.length > 0) {
      const roleData = partnershipRoles.map(role => ({ ...role, carePlanId: id }));
      await CarePlanPartnershipRole.bulkCreate(roleData, { transaction: t });
    }

    await t.commit();

    // Fetch updated care plan
    const result = await CarePlan.findByPk(id, {
      include: [
        { model: CarePlanChronicDisease, as: "chronicDiseases" },
        { model: CarePlanPartnershipRole, as: "partnershipRoles" }
      ]
    });

    res.json(result);
  } catch (err) {
    if (!t.finished) await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE Care Plan
 * Deletes associated chronicDiseases and partnershipRoles
 */
exports.deleteCarePlan = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only' });
    }
    const { id } = req.params;
    const carePlan = await CarePlan.findByPk(id, { transaction: t });
    if (!carePlan) return res.status(404).json({ error: "CarePlan not found" });

    // Delete associated records first
    await CarePlanChronicDisease.destroy({ where: { carePlanId: id }, transaction: t });
    await CarePlanPartnershipRole.destroy({ where: { carePlanId: id }, transaction: t });

    // Delete main care plan
    await carePlan.destroy({ transaction: t });

    await t.commit();
    res.json({ message: "CarePlan and associated records deleted successfully" });
  } catch (err) {
    if (!t.finished) await t.rollback();
    res.status(500).json({ error: err.message });
  }
};
