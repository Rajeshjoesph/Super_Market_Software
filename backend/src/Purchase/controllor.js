const mongoose = require("mongoose");
const purchase = require("./module");
const stockUpdate = require("../stock_inventroy/module");

const inboundEntry = async (req, res) => {
  try {
    const lastGrn = await purchase.findOne().sort({ _id: -1 });
    // const lastGrnNumber = parseInt(lastGrn.GrnNo, 10);
    let newGrnNumber;

    // console.log(lastGrnNumber);

    if (lastGrn && lastGrn.GrnNo) {
      const prefix = "BILL-";
      let numericPart = lastGrn.GrnNo;

      if (lastGrn.GrnNo.startsWith(prefix)) {
        numericPart = lastGrn.GrnNo.replace(prefix, "");
      }

      const parsedNumber = parseInt(numericPart, 10);

      if (isNaN(parsedNumber)) {
        throw new Error("Invalid GRN number format in the database.");
      }

      newGrnNumber = parsedNumber + 1;
    } else {
      newGrnNumber = 1;
    }

    const formattedGrnNumber = String(newGrnNumber).padStart(5, "0");

    let date = new Date();
    let entrydate =
      date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    let inboundData = {
      GrnNo: formattedGrnNumber,
      entrydate: entrydate,
      ...req.body,
      stockDetail: req.body.stockDetail.map((item) => ({
        ...item,
        qty: Number(item.qty),
        costPrices: Number(item.costPrices),
        gst: item.gst || "",
        discountAmt: item.discountAmt ? Number(item.discountAmt) : 0,
        sellingRate: Number(item.sellingRate),
        mrpPrices: Number(item.mrpPrices),
        netcost: Number(item.netcost),
        amount: Number(item.amount),
      })),
    };
    // purchase db code***
    const PurchaseData = await purchase.create(inboundData);
    console.log("PurchaseData", PurchaseData);

    for (const item of inboundData.stockDetail) {
      // console.log("test=>", item);

      const { itemCode, qty, sellingRate, mrpPrices } = item;

      const stock = await stockUpdate.updateOne(
        { itemCode: itemCode },
        {
          $inc: { stockLevel: qty },
          $set: { sellingPrices: sellingRate, mrpPrices: mrpPrices },
        }
      );
      if (stock.matchedCount > 0) {
        console.log(
          `Updated stock for itemCode ${itemCode}: Increased by ${qty}`
        );
      } else {
        console.log(
          `Item with itemCode ${itemCode} not found. Please check your data.`
        );
      }
    }
    res.json({
      data: PurchaseData,
      message: `GRN NO:${formattedGrnNumber}`,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      error: "There was an error processing your request.",
      details: err,
    });
  }
};

//view purchase data

const inboundDetails = async (req, res) => {
  try {
    const PurchaseData = await purchase.find();
    if (!purchase) {
      res.json({
        message: "No Record found",
      });
    }
    res.status(200).json({
      data: PurchaseData,
    });
  } catch (error) {
    res.json({
      Error: err,
    });
  }
};

const inboundBillDatil = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    let billFind = await purchase.findById(id);
    if (!billFind) {
      res.json({
        message: "No Bill Found",
      });
    }
    res.status(200).json({
      data: billFind,
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

const inboundBillEdit = async (req, res) => {
  try {
    const billEdit = await purchase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!billEdit) {
      res.json({
        message: "No Bill Found",
      });
    }
    res.status(200).json({
      data: billEdit,
      message: "Bill Update Successfully",
    });
  } catch (error) {
    res.json({
      Error: err,
    });
  }
};

const inboundBillDelete = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    let billDelete = await purchase.findOneAndDelete(id);
    if (!billDelete || billDelete == 0) {
      res.json({
        message: "No Data Founded",
      });
    } else {
      res.json({
        data: billDelete,
        message: "Purchase Bill Deleted",
      });
    }
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

module.exports = {
  inboundEntry,
  inboundDetails,
  inboundBillDatil,
  inboundBillEdit,
  inboundBillDelete,
};
