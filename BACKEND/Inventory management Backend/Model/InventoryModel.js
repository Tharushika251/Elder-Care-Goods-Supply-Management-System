const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
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
  price: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  productid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Inventory_DB", InventorySchema);
