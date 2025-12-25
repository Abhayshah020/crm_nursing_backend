require('dotenv').config(); 
const sequelize = require('./config/database');
const User = require('./models/User');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        const admin = await User.create({
            name: 'Admin User',           // Change this
            email: 'admin@smsitsolutions.com',   // Change this
            password: 'Admin@12345',        // Will be hashed automatically
            role: 'admin',
            status: 'active',
            permissions: {}
        });

        console.log('Admin user created:', admin.toJSON());
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
