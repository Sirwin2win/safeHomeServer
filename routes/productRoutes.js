const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const upload = require('../config/multer');
const { body } = require('express-validator');

const validateProduct = [
  body('name').notEmpty(),
  body('price').isNumeric(),
  body('category_id').isInt()
];

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);

router.post(
  '/',
  upload.single('image'),
  validateProduct,
  controller.createProduct
);

router.put(
  '/:id',
  upload.single('image'),
  validateProduct,
  controller.updateProduct
);

router.delete('/:id', controller.deleteProduct);

module.exports = router;