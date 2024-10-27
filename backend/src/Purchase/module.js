const mongoose = require("mongoose");
// const inventory = require("../inventory/module");

const inboundStock = new mongoose.Schema(
  {
    GrnNo: {
      type: String,
      require: true,
    },
    entrydate: {
      type: String,
      require: true,
    },
    supplyerName: {
      type: String,
      require: true,
    },
    supplyerGstNo: {
      type: String,
      require: true,
    },
    invoiceNo: {
      type: String,
      require: true,
    },
    billAmt: {
      type: Number,
      require: true,
    },
    totAmt: {
      type: Number,
      require: true,
    },
    stockDetail: [
      {
        itemCode: {
          type: Number,
          require: true,
          // unique: true,
        },
        itemName: {
          type: String,
          require: true,
        },
        costPrices: {
          type: Number,
          require: true,
        },
        gst: {
          type: Number,
          require: true,
        },
        discountAmt: {
          type: Number,
          require: true,
        },
        netcost: {
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
  },
  { timestamps: true }
);

const purchase = mongoose.model("PurchaseEntry", inboundStock);
module.exports = purchase;
