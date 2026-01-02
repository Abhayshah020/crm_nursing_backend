const router = require('express').Router();
const permission = require('../middlewares/permission.middleware');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const { rateLimiter } = require('../middlewares/rateLimiter');

router.use(rateLimiter);
router.use(auth);

// Admin only
router.post('/create-user', userController.createUser);

router.get('/get-users', userController.getUsers);

router.put('/update-users/:id', userController.updateUser);

router.delete('/delete-users/:id', userController.deleteUser);

router.put('/:userId/permissions', userController.updatePermissions);

module.exports = router;
