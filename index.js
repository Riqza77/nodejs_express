const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const port = 9000;
const bookRoutes = require('./src/routes/books');
const authRoutes = require('./src/routes/auth');
const categoryRoutes = require('./src/routes/category');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res,next) => {
    res.setHeader('Accesss-Control-Allow-Origin', '*');
    res.setHeader('Accesss-Control-Allow-Methods', 'GET,POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Accesss-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
})
app.use('/', bookRoutes);
app.use('/', authRoutes);
app.use('/', categoryRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(400).json({message: message, data: data})
})
mongoose.connect('mongodb+srv://muhriqzahadiyatullah:HLW6qGwZm3GRQKbH@cluster0.6e9f7mp.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
   app.listen(port, () => console.log('Koneksi Berhasil')); 
})
.catch(err => console.log(err))

