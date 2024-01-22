const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Category = new Schema({
    _id:{
        type: Number,
        default: null
    },
    name:{
        type: String,
        required: true
    }
},{
    timestamps : true
});
Category.plugin(AutoIncrement, { inc_field: '_id' });


module.exports = mongoose.model('Category', Category)