const db = require('../config/db');

const MaintenanceCategory = {
  create: async (data) => {
    const [result] = await db.execute(
      'INSERT INTO maintenanceCategories (name) VALUES (?)',
      [data.name]
    );
    return result;
  },

  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM maintenanceCategories');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM maintenanceCategories WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  update: async (id, data) => {
    const [result] = await db.execute(
      'UPDATE maintenanceCategories SET name = ? WHERE id = ?',
      [data.name,  id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await db.execute(
      'DELETE FROM maintenanceCategories WHERE id = ?',
      [id]
    );
    return result;
  },
};

module.exports = MaintenanceCategory;