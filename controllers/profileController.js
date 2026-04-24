const fs = require('fs');
const profileModel = require('../models/profileModel');

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newImagePath = req.file.path;

    // Get existing profile
    const existingProfile = await profileModel.getProfileByUserId(userId);

    // Delete old image if it exists
    if (existingProfile && existingProfile.imagePath) {
      fs.unlink(existingProfile.imagePath, (err) => {
        if (err) console.error('Error deleting old image:', err);
      });
    }

    // Save new image
    const result = await profileModel.createOrUpdateProfile(userId, newImagePath);

    res.status(200).json({
      message: 'Profile image updated successfully',
      data: result
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete image
exports.deleteProfileImage = async (req, res) => {
  try {
    const userId = req.params.userId;

    const profile = await profileModel.getProfileByUserId(userId);

    if (!profile || !profile.imagePath) {
      return res.status(404).json({ message: 'Profile image not found' });
    }

    // Delete file from storage
    fs.unlink(profile.imagePath, (err) => {
      if (err) console.error('Error deleting image:', err);
    });

    // Remove image path from DB
    await profileModel.removeProfileImage(userId);

    res.status(200).json({
      message: 'Profile image deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};