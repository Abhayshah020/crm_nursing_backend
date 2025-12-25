const { User } = require('../models');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role, permissions, userDetails } = req.body;

        // Optional: role guard
        // if (req.user.role !== 'admin') {
        //   return res.status(403).json({ message: 'Admin only' });
        // }

        // Prevent duplicate email
        const exists = await User.findOne({ where: { email } });
        if (exists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            permissions,
            userDetails
        });

        const { password: _, ...userWithoutPassword } = user.toJSON();

        return res.status(201).json({
            message: 'User created successfully',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Create User Error:', error);

        return res.status(500).json({
            message: 'Failed to create user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        return res.json(users);

    } catch (error) {
        console.error('Get Users Error:', error);

        return res.status(500).json({
            message: 'Failed to fetch users'
        });
    }
};

exports.updatePermissions = async (req, res) => {
    try {
        const { userId } = req.params;
        const { permissions } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.permissions = permissions;
        await user.save();

        return res.json({
            message: 'Permissions updated successfully',
            permissions
        });

    } catch (error) {
        console.error('Update Permissions Error:', error);

        return res.status(500).json({
            message: 'Failed to update permissions'
        });
    }
};
