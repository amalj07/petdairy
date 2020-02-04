const mongoose = require('mongoose');

//livestock Schema
let livestockSchema = mongoose.Schema({
    ownerid:{
        type: Number,
        required : true
    },
    ownername: {
        type: String,
        required: true
    },
    animalid: {
        type: String,
        required: true
    },
    animaltype: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    insured: {
        type: Boolean,
        default: false
    },
    insuranceno: {
        type: Number,
        required: true,
        default: 00
    },
    alive: {
        type: Boolean,
        default: false
    },
    deathdate: {
        type: String,
    },
    deathreason: {
        type: String,
    },
    disease: {
        type: String
    }

});

let livestock = module.exports = mongoose.model('livestock',livestockSchema);