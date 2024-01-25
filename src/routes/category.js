const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const categoryController = require('../controllers/category');

router.get('/categories',categoryController.getAllCategories);

router.post('/categories',[
    body('name').isLength({min: 4}).withMessage('Nama Tidak Boleh Kurang Dari 4 Karakter')
],categoryController.createCategory);

router.get('/categories/:id',categoryController.getCategoryById);

router.patch('/categories/:id',[
    body('name').isLength({min: 4}).withMessage('Nama Tidak Sesuai')
],categoryController.updateCategory);

router.delete('/categories/:id',categoryController.deleteCategory);


module.exports = router;