const db = require('../config/db');

class Category {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(name) {
    const [result] = await db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );
    return result;
  }

  static async update(id, category_name) {
    const [result] = await db.query(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
    return result;
  }
}

module.exports = Category;