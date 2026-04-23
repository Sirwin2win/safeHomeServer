const db = require('../config/db');

exports.findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.createUser = async (name,phone, email, password,role) => {
  const [result] = await db.query(
    'INSERT INTO users (name, phone, email, password,role) VALUES (?, ?, ?,?,?)',
    [name,phone, email, password,"user"]
  );
  return result.insertId;
};

exports.updateUser = async (id, data) => {
  const fields = [];
  const values = [];

  if (data.name) {
    fields.push('name = ?');
    values.push(data.name);
  }

  // if (data.role) {
  //   fields.push('role = ?');
  //   values.push(data.role);
  // }

  if (data.phone) {
    fields.push('phone = ?');
    values.push(data.phone);
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  const sql = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE id = ?
  `;

  values.push(id);

  const [result] = await db.execute(sql, values);
  return result;
};

exports.createProfile = async (userId, imagePath) => {
  const sql = `
    INSERT INTO profile (user_id, profile_picture, bio, location)
    VALUES (?, ?)
  `;
  const [result] = await db.execute(sql, [userId, imagePath]);
  return result;
};
