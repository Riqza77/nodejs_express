const {validationResult} = require('express-validator');
const category = require('../models/category');

exports.createCategory = (req,res,next) => {
    const name = req.body.name;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Invalid Value Tidak Sesuai');
        error.errorStatus = 400;
        error.data = errors.array()
        throw error;
    }

   
    const result = new category({
            name: name,
    })
    result.save()
    .then( results => {
        
        res.status(201).json({
            message : "Category Berhasil ditambahkan",
            data : results
        });
    })
    .catch(err => {
        console.log('err: ', err);
    })
}
exports.getAllCategories= (req,res, next) => {
    res.json({
        message : "Data Category Berhasil Diambil"
    });
    next();
}
exports.getCategoryById = (req,res, next) => {
    const categoryId = req.params.categoryId;
    res.json({
        message : "Data Category dengan Id " +categoryId+ " Berhasil Diambil"
    });
    next();
}
exports.updateCategory = (req,res, next) => {
    const categoryId = req.params.categoryId;
    const name = req.body.name;
    res.json({
        message : "Category dengan Id " +categoryId+" Berhasil diubah",
        data: {
            name: name, 
        }
    });
    next();
}
exports.deleteCategory = (req,res, next) => {
    const categoryId = req.params.categoryId;
    res.json({
        message : "Data Category dengan Id " +categoryId+ " Berhasil DiHapus"
    });
    next();
}