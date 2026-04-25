const MaintenanceCategory = require('../models/maintenanceCategoryModel');

exports.createCategory = async (req, res) => {
  try {
    const result = await MaintenanceCategory.create(req.body);
    res.status(201).json({ message: 'Category created', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const rows = await MaintenanceCategory.findAll();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const row = await MaintenanceCategory.findById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Not found' });
    res.json(row);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    await MaintenanceCategory.update(req.params.id, req.body);
    res.json({ message: 'Category updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await MaintenanceCategory.delete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};