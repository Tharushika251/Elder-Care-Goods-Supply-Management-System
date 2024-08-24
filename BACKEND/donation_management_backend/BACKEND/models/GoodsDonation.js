const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goodsDonationSchema = new Schema({
    donorId: {
        type: String,
        required: [true, 'Donor ID is required']
    },
    donateDate: {
        type: Date,
        required: [true, 'Donation Date is required']
    },
    note: {
        type: String
    },
    donateGoods: {
        type: String,
        required: [true, 'Goods to be donated is required']
    }
});

const GoodsDonation = mongoose.model("GoodsDonation", goodsDonationSchema);

module.exports = GoodsDonation;
