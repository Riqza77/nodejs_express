const express = require('express');
const app = express();
const port = 9000;
const bookRoutes = require('./src/routes/books');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res,next) => {
    res.setHeader('Accesss-Control-Allow-Origin', '*');
    res.setHeader('Accesss-Control-Allow-Methods', 'GET,POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Accesss-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
})
app.use('/', bookRoutes);

app.listen(port);