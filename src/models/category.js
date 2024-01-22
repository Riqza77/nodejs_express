const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    _id: {
        type: Number,
        default: () => {
            const randomValue = Math.floor(Math.random() * 10000000000); 
            const paddedValue = String(randomValue).padStart(10, '0');
            return parseInt(paddedValue, 10);
        }
    },
    name:{
        type: String,
        required: true
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Category', Category)