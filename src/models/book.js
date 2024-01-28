const mongoose = require('mongoose');
const category = require('./category');
const Schema = mongoose.Schema;

const Book = new Schema({
    _id:{
        type: Number,
        default: () => {
            const randomValue = Math.floor(Math.random() * 10000000000); 
            const paddedValue = String(randomValue).padStart(10, '0');
            return parseInt(paddedValue, 10); 
        }
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image_url:{
        type: String,
        required: true
    },
    release_year:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    total_page:{
        type: Number,
        required: true
    },
    thickness:{
        type: String,
        required: true
    },
    category_id:{
        type: Number,
        required: true
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Book', Book)