const book = require("../models/book");
const {validationResult} = require('express-validator');
const category = require("../models/category");

exports.createBook = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const release_year = req.body.release_year;
    const price = req.body.price;
    const total_page = req.body.total_page;
    const categoryName = req.body.nama_kategori;
    
    const kategori = category.findOne({ name: categoryName });

        if (!kategori) {
            return res.status(404).json({ message: 'Category Tidak Ditemukan' });
        }

    const errors = validationResult(req);
    
    let thickness
    if(total_page <= 100){
        thickness = "tipis";
    }else if(total_page >= 201){ 
        thickness = "tebal";
    }else if(total_page >= 101 && total_page <= 200){
        thickness = "sedang";
    }
    if(!errors.isEmpty()){
        const error = new Error('Invalid Value Tidak Sesuai');
        error.errorStatus = 400;
        error.data = errors.array()
        throw error;
    }
    const result = new book({
            title: title, 
            description: description,
            image_url : "/images/books",
            release_year : release_year,
            price: price,
            total_page: total_page,
            thickness: thickness,
            category_id: kategori
    })
    result.save()
    .then( results => {
        
        res.status(201).json({
            message : "Buku Berhasil ditambahkan",
            data : results
        });
    })
    .catch(err => {
        console.log('err: ', err);
    })
}
exports.getAllBooks= (req,res, next) => {
    res.json({
        message : "Data Buku Berhasil Diambil"
    });
    next();
}
exports.getBookById = (req,res, next) => {
    const bookId = req.params.bookId;
    res.json({
        message : "Data Buku dengan Id " +bookId+ " Berhasil Diambil"
    });
    next();
}
exports.updateBook = (req,res, next) => {
    const bookId = req.params.bookId;
    const title = req.body.title;
    const description = req.body.description;
    const release_year = req.body.release_year;
    const price = req.body.price;
    const total_page = req.body.total_page;

    const errors = validationResult(req);
    
    let thickness
    if(total_page <= 100){
        thickness = "tipis";
    }else if(total_page >= 201){ 
        thickness = "tebal";
    }else if(total_page >= 101 && total_page <= 200){
        thickness = "sedang";
    }
    if(!errors.isEmpty()){
        const error = new Error('Invalid Value Tidak Sesuai');
        error.errorStatus = 400;
        error.data = errors.array()
        throw error;
    }
    const result = new book({
            title: title, 
            description: description,
            image_url : "/images/books",
            release_year : release_year,
            price: price,
            total_page: total_page,
            thickness: thickness,
            category_id: 1 
    })
    result.save()
    .then( results => {
        
        res.status(201).json({
            message : "Buku dengan id "+bookId+" Berhasil ditambahkan",
            data : results
        });
    })
    .catch(err => {
        console.log('err: ', err);
    })
}
exports.deleteBook = (req,res, next) => {
    const bookId = req.params.bookId;
    res.json({
        message : "Data Buku dengan Id " +bookId+ " Berhasil DiHapus"
    });
    next();
}