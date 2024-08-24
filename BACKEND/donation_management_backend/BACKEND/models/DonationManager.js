const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationManagerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/ // Validate email format using regular expression
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\+\d{1,3}\s\d{9}$/.test(value); // Validate phone number with country code
            },
            message: props => `${props.value} is not a valid phone number! Please provide a phone number with a country code, for example: +94 123456789`
        }
    },
    nic: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^(?:\d{9}[vV]|\d{12})$/.test(value); // Validate NIC format using regular expression
            },
            message: props => `${props.value} is not a valid NIC! Please provide a NIC in either 9-digit format followed by 'V' or 'v' or 12-digit format.`
        }
    },
    address: {
        type: String,
        required: true
    },
});

const DonationManager = mongoose.model("DonationManager", donationManagerSchema);

module.exports = DonationManager;
