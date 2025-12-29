const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require("../config/database");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
    },

    role: {
        type: DataTypes.ENUM('admin', 'employee'),
        defaultValue: 'employee'
    },

    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },

    permissions: {
        type: DataTypes.JSONB,
        defaultValue: {
            view: true,
            create: false,
            edit: false,
            delete: false
        }
    },

    userDetails: {
        type: DataTypes.JSONB,
        defaultValue: {}
    }

}, {
    tableName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = User;
