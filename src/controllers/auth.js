const {validationResult} = require('express-validator');
const auth = require('../models/auth');


exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    res.json({
        message : "Login Berhasil",
        data: {
            email: email,
            password : password,
        }
    });
    next();
}
exports.register = (req,res,next) => {
    const nama = req.body.nama;
    const email = req.body.email;
    const password = req.body.password;

    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Invalid Value Tidak Sesuai');
        error.errorStatus = 400;
        error.data = errors.array()
        throw error;
    }

   
    const result = new auth({
            nama: nama, 
            email: email,
            password : password,
    })
    result.save()
    .then( results => {
        
        res.status(201).json({
            message : "Registrasi Berhasil",
            data : results
        });
    })
    .catch(err => {
        console.log('err: ', err);
    })
    
    
}