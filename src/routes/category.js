const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const categoryController = require('../controllers/category');

router.get('/categories',categoryController.getAllCategories);

router.post('/category',[
    body('name').isLength({min: 4}).withMessage('Nama Tidak Boleh Kurang Dari 4 Karakter')
],categoryController.createCategory);

router.get('/category/:bookId',categoryController.getCategoryById);

router.patch('/category/:bookId',[
    body('name').isLength({min: 4}).withMessage('Nama Tidak Sesuai')
],categoryController.updateCategory);

router.delete('/category/:bookId',categoryController.deleteCategory);


module.exports = router;