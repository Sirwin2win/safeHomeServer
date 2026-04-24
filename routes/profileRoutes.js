const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const profileController = require('../controllers/profileController');

router.post(
  '/profile',
  upload.single('profile_picture'),
  profileController.createProfile
);

module.exports = router;