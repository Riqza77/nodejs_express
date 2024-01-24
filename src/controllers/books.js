const book = require("../models/book");
const category = require("../models/category");
const auth = require("../models/auth");
const {validationResult} = require('express-validator');

exports.createBook = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const release_year = req.body.release_year;
    const price = req.body.price;
    const total_page = req.body.total_page;
    const categoryName = req.body.nama_kategori;
    const username = req.body.username;
    let id_category

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
    auth.findOne({ nama: username })
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
                image_url: "/images/sjd",
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
exports.getAllBooks= (req,res, next) => {
    book.find()
    .then( result => {

        res.json({
            message : "Data Buku Berhasil Diambil",
            data : result
        });
    })
    .catch(err => {
        next(err)
    });
}
exports.getBookById = (req,res, next) => {
    const bookId = req.params.bookId;
    
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
    const bookId = req.params.bookId;
    const title = req.body.title;
    const description = req.body.description;
    const release_year = req.body.release_year;
    const price = req.body.price;
    const total_page = req.body.total_page;
    const categoryName = req.body.nama_kategori;
    const username = req.body.username;
    let id_category

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
    
    auth.findOne({ nama: username })
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

        return book.findOneAndUpdate(
            { _id: bookId },
            {
                $set: {
                    title: title,
                    description: description,
                    release_year: release_year,
                    image_url: "/images/sjd",
                    price: price,
                    total_page: total_page,
                    thickness: thickness,
                    category_id: id_category
                }
            },
            { new: true }
        );
    })
    .then(updatedBook => {
        if (!updatedBook) {
            return Promise.reject("Buku tidak ditemukan");
        }
        res.status(200).json({
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
    const bookId = req.params.bookId;
    res.json({
        message : "Data Buku dengan Id " +bookId+ " Berhasil DiHapus"
    });
    next();
}