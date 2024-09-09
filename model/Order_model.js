const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Object,
    required: true,
  },
  order: {
    type: Array,
    required: true,
  },
  orderTotalQuantity: {
    type: Number,
    required: true,
  },
  orderTotalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
