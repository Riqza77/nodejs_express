const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/books',booksController.getAllBooks);

router.post('/book',[
    body('title').isLength({min: 4}).withMessage('Nama Tidak Boleh Kurang Dari 4 Karakter'),
    body('description').isLength({min: 10}).withMessage('Deskripsi Tidak Boleh Kurang Dari 10 Karakter'),
    body('release_year').isLength({min: 4}).withMessage('Tahun Rilis Tidak Boleh Kurang Dari 4 Karakter'),body('release_year')
        .isInt({ min: 1980, max: 2021 })
        .withMessage('Tahun Rilis harus antara 1980 dan 2021'),
],booksController.createBook);

router.get('/book/:bookId',booksController.getBookById);

router.patch('/book/:bookId',[
    body('title').isLength({min: 4}).withMessage('Nama Tidak Boleh Kurang Dari 4 Karakter'),
    body('description').isLength({min: 10}).withMessage('Deskripsi Tidak Boleh Kurang Dari 10 Karakter'),
    body('release_year').isLength({min: 4}).withMessage('Tahun Rilis Tidak Boleh Kurang Dari 4 Karakter'),body('release_year')
        .isInt({ min: 1980, max: 2021 })
        .withMessage('Tahun Rilis harus antara 1980 dan 2021'),
],booksController.updateBook);

router.delete('/book/:bookId',booksController.deleteBook);

module.exports = router;