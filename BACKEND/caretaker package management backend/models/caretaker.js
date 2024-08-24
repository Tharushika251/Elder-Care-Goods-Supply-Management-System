// models/caretaker.js

const mongoose = require('mongoose');

const caretakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    workfee: {
        type: Number,
        required: true
    }
});

const Caretaker = mongoose.model("Caretaker", caretakerSchema);

module.exports = Caretaker;
