const mongoose = require("mongoose");

const outBound = new mongoose.Schema({
  entrydate: {
    type: String,
    require: true,
  },
  billNum: {
    type: String,
    require: true,
  },
  coustomerName: {
    type: String,
    require: true,
  },
  coustomerMobileNo: {
    type: String,
    require: true,
  },
  coustomerPlace: {
    type: String,
    require: true,
  },
  totalAmt: {
    type: Number,
    require: true,
  },
  paymentType: {
    type: String,
    require: true,
  },
  productDetail: [
    {
      itemCode: {
        type: Number,
        require: true,
      },
      itemName: {
        type: String,
        require: true,
      },
      discountAmt: {
        type: Number,
        require: true,
      },
      sellingRate: {
        type: Number,
        require: true,
      },
      mrpPrices: {
        type: Number,
        require: true,
      },
      qty: {
        type: Number,
        require: true,
      },
      amount: {
        type: Number,
        require: true,
      },
    },
  ],
});

const salesModules = mongoose.model("SalesBills", outBound);
module.exports = salesModules;
