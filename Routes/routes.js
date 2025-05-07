const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');

router.post('/users/register', userController.register);
router.post('/users/login', authController.login);

// Protected Routes (require authentication)
router.get('/users/me', auth, (req, res) => {
    const user = req.user.toObject();
    delete user.password; 
    res.json(user);
});

router.get('/users/email/:email', auth, userController.getUserByEmail);
router.put('/users/:email', auth, userController.updateUser);

// Admin-only Route
router.delete('/users/:email', auth, adminAuth, (req, res) => {
    userController.deleteUser(req, res);
});
router.delete('/users/:email', auth, adminAuth, userController.deleteUser);

module.exports = router;


