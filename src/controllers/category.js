const {validationResult} = require('express-validator');
const category = require('../models/category');
const auth = require('../models/auth');

exports.createCategory = (req,res,next) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Invalid Value Tidak Sesuai');
        error.errorStatus = 400;
        error.data = errors.array()
        throw error;
    }


    auth.findOne({ nama: username, password : password })
    .then( result => {
        if (result) {
            
            const newCategory = new category({
                    name: name,
            })
            return newCategory.save()
        } else {
            return Promise.reject("Anda Belum Login");
        }
    })
    .then((savedCategory) => {
        res.status(201).json({
            message: "Category Berhasil ditambahkan",
            data: savedCategory,
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    })

    
}
exports.getAllCategories= (req,res, next) => {
    category.find()
    .then( result => {
        res.status(200).json({
            message : "Data Category Berhasil Diambil",
            data: result
        });

    })
    .catch(err => {
        next(err)
    })
}
exports.getCategoryById = (req,res, next) => {
    const categoryId = req.params.id;
    category.findById(categoryId)
    .then( result => {
        if(!result){
           return Promise.reject("Kategori Tidak Ditemukan");
        }
           return res.status(200).json({
                message : "Data Category dengan Id " +categoryId+ " Berhasil Diambil",
                data : result
            });
    })
    .catch( err => {
        res.status(404).json({
            error : err
        });
    })
}
exports.updateCategory = (req,res, next) => {
    const categoryId = req.params.id;
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    auth.findOne({ nama: username, password : password })
    .then( result => {
        if (!result) {
            
            return Promise.reject("Anda Belum Login");
        }
        return category.findById(categoryId)
    
    })
    .then( result => {
        if(result){
            result.name = name;
            return result.save();

        }
        return Promise.reject("Kategori tidak ditemukan");
    })
    .then(updatedCategory => {
        if (!updatedCategory) {
            return Promise.reject("Kategori tidak ditemukan");
        }
        return res.status(200).json({
            message: "Kategori Berhasil Diedit",
            data: updatedCategory,
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    })


}
exports.deleteCategory = (req,res, next) => {
    const categoryId = req.params.id;
    category.findByIdAndDelete(categoryId)
    .then( result => {
        if(result){
            return res.json({
                message : "Data Category dengan Id " +categoryId+ " Berhasil DiHapus",
                data : result.name
            });

        }
        return Promise.reject("Kategori tidak ditemukan");
    })
    .catch( err => {
        return res.status(404).json({
            message: "Kategori tidak ditemukan",
            error: err
        });
    })
}

