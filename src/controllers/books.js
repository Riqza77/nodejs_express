const book = require("../models/book");
const category = require("../models/category");
const auth = require("../models/auth");
const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs');

exports.createBook = (req,res,next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Invalid Value Tidak Sesuai');
        error.errorStatus = 400;
        error.data = errors.array()
        throw error;
    }
    if(!req.file){
        const error = new Error('Image Harus di Upload');
        error.errorStatus = 422;
        throw error;
    }
        

    const title = req.body.title;
    const description = req.body.description;
    const image = req.file.path;
    const release_year = req.body.release_year;
    const price = req.body.price;
    const total_page = req.body.total_page;
    const categoryName = req.body.nama_kategori;
    const username = req.body.username;
    const password = req.body.password;
    let id_category

    
    let thickness
    if(total_page <= 100){
        thickness = "tipis";
    }else if(total_page >= 201){ 
        thickness = "tebal";
    }else if(total_page >= 101 && total_page <= 200){
        thickness = "sedang";
    }
    auth.findOne({ nama: username, password : password })
    .then((na) => {
        if (na) {
            return category.findOne({ name: categoryName });
        } else {
            return Promise.reject("Pengguna tidak ditemukan");
        }
    })
    .then((result) => {
        if (result) {
            
        
        id_category = result._id;

            const newBook = new book({
                title: title,
                description: description,
                release_year: release_year,
                image_url: image,
                price: price,
                total_page: total_page,
                thickness: thickness,
                category_id: id_category,
            });

            return newBook.save();
        } else {
            return Promise.reject("Kategori tidak ditemukan");
        }
    })
    .then((savedBook) => {
        res.status(201).json({
            message: "Buku Berhasil ditambahkan",
            data: savedBook,
        });
    })
    .catch((err) => {
        console.error('Error:', err);
        let errorMessage = "Internal Server Error";
        if (err.message === "Kategori tidak ditemukan" || err.message === "Pengguna tidak ditemukan") {
            errorMessage = err.message;
        }

        res.status(500).json({
            message: errorMessage,
            error: err,
        });
    });
}
exports.getAllBooks= (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;
    
    book.find()
    .countDocuments()
    .then( count => {
        totalItems = count;
        return book.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then( result => {

        res.status(200).json({
            message : "Data Buku Berhasil Diambil",
            data : result,
            total_Data : totalItems,
            per_Page:perPage,
            current_Page : currentPage,
        });
    })
    .catch(err => {
        next(err)
    });
}
exports.getBookById = (req,res, next) => {
    const bookId = req.params.id;
    
    book.findById(bookId)
    .then( result => {

        res.json({
            message : "Data Buku dengan Id " +bookId+ " Berhasil Diambil",
            data : result
        });
    })
    .catch(err => {
        next(err)
    });
}
exports.updateBook = (req,res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Invalid Value Tidak Sesuai');
        error.errorStatus = 400;
        error.data = errors.array()
        throw error;
    }
    if(!req.file){
        const error = new Error('Image Harus di Upload');
        error.errorStatus = 422;
        throw error;
    }
    
    const bookId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file.path;
    const release_year = req.body.release_year;
    const price = req.body.price;
    const total_page = req.body.total_page;
    const categoryName = req.body.nama_kategori;
    const username = req.body.username;
    const password = req.body.password;
    let id_category

    

    let thickness
    if(total_page <= 100){
        thickness = "tipis";
    }else if(total_page >= 201){ 
        thickness = "tebal";
    }else if(total_page >= 101 && total_page <= 200){
        thickness = "sedang";
    }
    
    
    auth.findOne({ nama: username , password : password })
    .then(na => {
        if (!na) {
            return Promise.reject("Pengguna tidak ditemukan");
        }
        return category.findOne({ name: categoryName });
    })
    .then(result => {
        if (!result) {
            return Promise.reject("Kategori tidak ditemukan");
        }
        
        id_category = result._id;

        return book.findById(bookId)
    
    })
    .then( result => {
        if(result){
            removeImage(result.image_url);
            result.title = title,
            result.description = description,
            result.release_year = release_year,
            result.image_url = image,
            result.price = price,
            result.total_page = total_page,
            result.thickness = thickness,
            result.category_id = id_category
            return result.save();

        }
        return Promise.reject("Buku tidak ditemukan");
    })
    .then(updatedBook => {
        if (!updatedBook) {
            return Promise.reject("Buku tidak ditemukan");
        }
        return res.status(200).json({
            message: "Buku Berhasil Diedit",
            data: updatedBook
        });
    })
    .catch(err => {
        console.error('Error:', err);
        let statusCode = 500;
        if (err.message === "Pengguna tidak ditemukan" || err.message === "Kategori tidak ditemukan") {
            statusCode = 404;
        } else if (err.message === "Buku tidak ditemukan") {
            statusCode = 404;
        }

        res.status(statusCode).json({
            message: err.message,
            error: err
        });
    });
}
exports.deleteBook = (req,res, next) => {
    const bookId = req.params.id;
    book.findByIdAndDelete(bookId)
    .then( result => {
        if(result){
            removeImage(result.image_url);
            return res.json({
                message : "Data Buku dengan Id " +bookId+ " Berhasil DiHapus",
                data : result
            });

        }
        return Promise.reject("Buku tidak ditemukan");
    })
    .catch( err => {
        return res.status(404).json({
            message: "Buku tidak ditemukan",
            error: err
        });
    })
    
}

const removeImage = (url) => {
    console.log('Filepath', url);
    console.log('dirnam', __dirname);
    filepath = path.join(__dirname,'../..',url);
    console.log(filepath);
    fs.unlink(filepath, err => console.log('error', err));
}