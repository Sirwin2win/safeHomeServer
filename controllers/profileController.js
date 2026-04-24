const profileModel = require('../models/profileModel');

exports.createProfile = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = req.file.path;

    const result = await profileModel.createProfile(userId, imagePath);

    res.status(201).json({
      message: 'Profile created successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};