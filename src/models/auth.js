const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Auth = new Schema({
    _id:{
        type: Number,
        default: () => {
            const randomValue = Math.floor(Math.random() * 10000000000); 
            const paddedValue = String(randomValue).padStart(10, '0');
            return parseInt(paddedValue, 10); 
        }
    },
    nama:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Auth', Auth)