const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/books',booksController.getAllBooks);
router.post('/book',booksController.createBook);
router.get('/book/:bookId',booksController.getBookById);
router.patch('/book/:bookId',booksController.updateBook);
router.delete('/book/:bookId',booksController.deleteBook);

module.exports = router;