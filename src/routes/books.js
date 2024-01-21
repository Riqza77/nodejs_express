const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/books',booksController.getAllBooks);
router.post('/book',booksController.createbook);

module.exports = router;