const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.get('/categories',categoryController.getAllCategories);
router.post('/category',categoryController.createCategory);
router.get('/category/:bookId',categoryController.getCategoryById);
router.patch('/category/:bookId',categoryController.updateCategory);
router.delete('/category/:bookId',categoryController.deleteCategory);

module.exports = router;