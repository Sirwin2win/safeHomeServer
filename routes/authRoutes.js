const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', authMiddleware, authController.changePassword);
router.put('/users/:id', authController.updateUser);



// Protected route
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;