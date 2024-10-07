const mongoose = require("mongoose");

const StockInventory = new mongoose.Schema({
  itemCode: {
    type: Number,
    require: true,
    // unique: true,
  },
  itemName: {
    type: String,
    require: true,
  },
  stockLevel: {
    type: Number,
    require: true,
  },
  damageStock: {
    type: Number,
    require: true,
  },
  encode: {
    type: Number,
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

const stockData = mongoose.model("INVENTROYSTOCK", StockInventory);

module.exports = stockData;
