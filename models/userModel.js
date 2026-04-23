const db = require('../config/db');

exports.findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.createUser = async (name,phone, email, password) => {
  const [result] = await db.query(
    'INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?,?)',
    [name,phone, email, password]
  );
  return result.insertId;
};