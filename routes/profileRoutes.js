const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const profileController = require('../controllers/profileController');

router.post(
  '/',upload.single('image'),profileController.createOrUpdateProfile
);

// Delete profile image
router.delete(
  '/:userId',profileController.deleteProfileImage
);

module.exports = router;