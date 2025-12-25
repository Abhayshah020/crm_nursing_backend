module.exports = (permission) => {
    return (req, res, next) => {
        if (req.user.role === 'admin') {
            return next(); // Admin bypass
        }

        if (!req.user.permissions || !req.user.permissions[permission]) {
            return res.status(403).json({
                message: 'Permission denied'
            });
        }

        next();
    };
};
