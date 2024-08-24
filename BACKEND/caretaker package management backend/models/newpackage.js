// models/newpackage.js

const mongoose = require('mongoose');

const newpackageSchema = new mongoose.Schema({
    nPname: {
        type: String,
        required: true
    },
    
    nPdescription: {
        type: String,
        required: true
    },
    nPprice: {
        type: Number,
        required: true
    }
});

const Newpackage = mongoose.model("Newpackage", newpackageSchema);

module.exports = Newpackage;
