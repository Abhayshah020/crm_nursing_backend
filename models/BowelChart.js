const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BowelChart = sequelize.define(
    "BowelChart",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        patientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        bowelMotion: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },  

        bristolAmount: {
            type: DataTypes.ENUM("Small", "Medium", "Large"),
            defaultValue: "Small",
        },
        bristolType: {
            type: DataTypes.ENUM("Separate hard lumps (severe constipation)", "Sausage-shaped but lumpy", "Sausage with cracks on surface", "Smooth, soft sausage or snake (normal)", "Soft blobs with clear edges", "Mushy stool, fluffy pieces", "Watery, no solid pieces (diarrhoea)"),
            allowNull: true,
        },

        // Additional Observations
        staffInitials: {
            type: DataTypes.STRING,
            defaultValue: false,
        },
        straining: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        painDiscomfort: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        bloodMucusPresent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        incompleteEmptying: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        unusualOdour: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        staffName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        formData: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
        },
    },
    {
        tableName: "bowel_charts",
        timestamps: true,
        indexes: [
            { fields: ["patientName"] },
            { fields: ["timestamp"] },
        ],
    }
);

module.exports = BowelChart;
