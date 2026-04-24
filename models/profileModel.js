const db = require('../config/db');

exports.createProfile = async (userId, imagePath) => {
  const sql = `
    INSERT INTO profile (user_id, profile_picture)
    VALUES (?, ?)
  `;

  const [result] = await db.execute(sql, [userId, imagePath]);
  return result.insertId;
};