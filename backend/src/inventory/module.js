const mongoose = require("mongoose");

const storeInv = new mongoose.Schema({
  itemCode: {
    type: Number,
    require: true,
    // unique: true,
  },
  itemName: {
    type: String,
    require: true,
  },
  encode: {
    type: Number,
    require: true,
  },
  manufacturer: {
    type: String,
    require: true,
  },
  gst: {
    type: String,
    require: true,
  },
  sellingPrices: {
    type: Number,
    require: true,
  },
  mrpPrices: {
    type: Number,
    require: true,
  },
});

const inventory = mongoose.model("inventory", storeInv);

module.exports = inventory;
