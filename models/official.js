const mongoose = require('mongoose');

//Officials Schema
let officialsSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

let Officials = module.exports = mongoose.model('Officials',officialsSchema);