const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InfromySchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  productid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("infrom_db", InfromySchema);
