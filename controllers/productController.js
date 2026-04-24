const Product = require('../models/productModel');
const { validationResult } = require('express-validator');

exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());

  try {
    const image = req.file ? req.file.filename : null;

    const result = await Product.create({
      ...req.body,
      image
    });

    res.status(201).json({
      id: result.insertId,
      ...req.body,
      image
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : req.body.image;

    const result = await Product.update(req.params.id, {
      ...req.body,
      image
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const result = await Product.getAll({
    page: req.query.page || 1,
    limit: req.query.limit || 10,
    search: req.query.search || ''
  });

  res.json(result);
};

exports.getProductById = async (req, res) => {
  const product = await Product.getById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });

  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const result = await Product.softDelete(req.params.id);

  if (!result.affectedRows) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json({ message: 'Deleted successfully' });
};