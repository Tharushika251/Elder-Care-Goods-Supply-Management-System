const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    name: String,
    item: String,
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    cnumber: Number,
    address: String,
});
const User = mongoose.model('Supplier', userSchema);

module.exports = User;
