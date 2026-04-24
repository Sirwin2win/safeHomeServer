const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const profileController = require('../controllers/profileController');

router.post(
  '/profile',upload.single('profile_picture'),profileController.createOrUpdateProfile
);

// Delete profile image
router.delete(
  '/profile/:userId',profileController.deleteProfileImage
);

module.exports = router;