const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/login',authController.login);
router.post('/register',[
    body('nama').isLength({min: 4}).withMessage('Nama Tidak Boleh Kurang Dari 4 Karakter')
],authController.register);

module.exports = router;