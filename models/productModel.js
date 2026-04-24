const db = require('../config/db');

class Product {
  static async getAll({ page, limit, search }) {
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.*, c.category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.deleted_at IS NULL
    `;

    let countQuery = `SELECT COUNT(*) as total FROM products WHERE deleted_at IS NULL`;
    let params = [];

    if (search) {
      query += ` AND p.name LIKE ?`;
      countQuery += ` AND name LIKE ?`;
      params.push(`%${search}%`);
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await db.query(query, params);
    const [count] = await db.query(countQuery, search ? [`%${search}%`] : []);

    return {
      data: rows,
      total: count[0].total,
      page,
      limit
    };
  }

  static async getById(id) {
    const [rows] = await db.query(
      `SELECT p.*, c.category_name
       FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE p.id = ? AND p.deleted_at IS NULL`,
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const {
      name,
      address,
      price,
      number_of_rooms,
      number_of_baths,
      size,
      description,
      image,
      category_id
    } = data;

    const [result] = await db.query(
      `INSERT INTO products 
      (name, address, price, number_of_rooms, number_of_baths, size, description, image, category_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, address, price, number_of_rooms, number_of_baths, size, description, image, category_id]
    );

    return result;
  }

  static async update(id, data) {
    const {
      name,
      address,
      price,
      number_of_rooms,
      number_of_baths,
      size,
      description,
      image,
      category_id
    } = data;

    const [result] = await db.query(
      `UPDATE products SET
        name = ?, address = ?, price = ?, number_of_rooms = ?, 
        number_of_baths = ?, size = ?, description = ?, image = ?, category_id = ?
       WHERE id = ? AND deleted_at IS NULL`,
      [name, address, price, number_of_rooms, number_of_baths, size, description, image, category_id, id]
    );

    return result;
  }

  static async softDelete(id) {
    const [result] = await db.query(
      `UPDATE products SET deleted_at = NOW() WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = Product;