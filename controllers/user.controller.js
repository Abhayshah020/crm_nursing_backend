const { User } = require('../models');

exports.createUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }

        const {
            name,
            email,
            password,
            role,
            permissions,
            userDetails,
            createdBy,
            createdById,
        } = req.body;

        const exists = await User.findOne({ where: { email } });
        if (exists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const user = await User.create({
            name,
            email,
            password, // hashed via model hook
            role,
            permissions,
            userDetails,
            createdBy,
            createdById,
        });

        const { password: _, ...safeUser } = user.toJSON();

        return res.status(201).json({
            message: 'User created successfully',
            user: safeUser
        });

    } catch (error) {
        console.error('Create User Error:', error);
        return res.status(500).json({ message: 'Failed to create user' });
    }
};


exports.getUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }

        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
        });

        return res.json(users);

    } catch (error) {
        console.error('Get Users Error:', error);
        return res.status(500).json({ message: 'Failed to fetch users' });
    }
};


exports.updateUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }

        const { id } = req.params;
        const { name, email, password, role, permissions, userDetails } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.role = role ?? user.role;
        user.permissions = permissions ?? user.permissions;
        user.userDetails = userDetails ?? user.userDetails;

        if (password) {
            user.password = password; // re-hashed via hook
        }

        await user.save();

        const { password: _, ...safeUser } = user.toJSON();

        return res.json({
            message: 'User updated successfully',
            user: safeUser
        });

    } catch (error) {
        console.error('Update User Error:', error);
        return res.status(500).json({ message: 'Failed to update user' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }

        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();

        return res.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Delete User Error:', error);
        return res.status(500).json({ message: 'Failed to delete user' });
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
