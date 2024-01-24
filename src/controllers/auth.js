const {validationResult} = require('express-validator');
const auth = require('../models/auth');

exports.get = (req,res,next) => {
    auth.find()
    .then( result => {
        res.status(200).json({
            message : "Data User Berhasil Diambil",
            data: result
        });

    })
    .catch(err => {
        next(err)
    })
}
exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    auth.findOne({email:email,password : password})
    .then(result => {
        if(result){
                res.json({
                message : "Login Berhasil",
                data: result
            });

        } else {
            return Promise.reject("Email Dan Password Tidak Cocok, Silahkan Masukkan Data Dengan Benar!");
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Invalid Value Tidak Sesuai',
            error: err,
        });
    })
    
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