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
    
    res.json({
        message : "Registrasi Berhasil",
        data: {
            nama: nama, 
            email: email,
            password : password,
        }
    });
    next();
}