require('dotenv').config(); 
const sequelize = require('./config/database');
const User = require('./models/User');

(async () => {
    try {
        await sequelize.authenticate();

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@hdcs.com.au',
            password: 'Admin@12345',
            role: 'admin',
            status: 'active',
            createdById: -1,
            createdBy: "system",
            permissions: {}
        });

        console.log('Admin user created:', admin.toJSON());
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
