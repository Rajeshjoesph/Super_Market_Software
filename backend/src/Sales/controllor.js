const { json } = require("express");
const salesModules = require("./module");
const stockUpdate = require("../stock_inventroy/module");
const io = require("../../index");
const moment = require("moment");
const { checkStockAndNotify } = require("../utils/stockCheck");
// bill entry
const saleBill = async (req, res) => {
  try {
    const io = req.io;
    // console.log(req.body);
    const lastBill = await salesModules.findOne().sort({ _id: -1 });
    const lastBillNum = lastBill
      ? parseInt(lastBill.billNum.replace("BILL-", ""), 10)
      : 0;
    const newBill = lastBillNum + 1;

    let date = new Date();
    let BillDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    // console.log("newBill=>", ${String(newBill).padStart(4, "0")}});

    const outBound = {
      billNum: `BILL-${String(newBill).padStart(3, "0")}`,
      entrydate: BillDate,
      ...req.body,
      productDetail: req.body.productDetail.map((item) => ({
        ...item,
        qty: Number(item.qty),
        discountAmt: item.discountAmt ? Number(item.discountAmt) : 0,
        sellingRate: Number(item.sellingRate),
        mrpPrices: Number(item.mrpPrices),
        amount: Number(item.amount),
      })),
    };
    const storeSaleBill = await salesModules.create(outBound);
    // console.log("storeSaleBill=>", storeSaleBill);

    for (const item of outBound.productDetail) {
      const { itemCode, qty } = item;

      const stock = await stockUpdate.updateOne(
        { itemCode: itemCode },
        {
          $inc: { stockLevel: -qty },
        }
      );
      if (stock.matchedCount > 0) {
        const updateStock = await stockUpdate.findOne({ itemCode }).lean();
        console.log(updateStock);

        console.log(
          updateStock.itemCode,
          "Stock update data:",
          updateStock.stockLevel
        );
        // if (updateStock.stockLevel < 50) {
        //   console.log("Stock update data message");

        //   io.emit("lowStockAlert", {
        //     itemCode: updateStock.itemCode,
        //     stockLevel: updateStock.stockLevel,
        //     message: `Stock for ${updateStock.itemCode} is low: ${updateStock.stockLevel} units left.`,
        //   });
        // }
        checkStockAndNotify(updateStock.itemCode, updateStock.stockLevel, io);
        console.log(
          `Updated stock for itemCode ${itemCode}: SoildOut by ${qty}`
        );
        console.log("Sale entry saved with Bill Code:", storeSaleBill.billNum);
      } else {
        console.log(
          `Item with itemCode ${itemCode} not found. Please check your data.`
        );
      }
    }
    res.json({
      data: storeSaleBill,
      Message: "Bill Was Saved",
    });
  } catch (error) {
    res.status(500).json({
      Error: "Some thing was error",
      details: error.message,
    });
  }
};
// view all bill
const viewBills = async (req, res) => {
  try {
    const allBills = await salesModules.find();
    res.json({
      data: allBills,
      Message: "All bills",
    });
  } catch {
    res.status(500),
      json({
        Error: "Some thing.. error",
        details: err,
      });
  }
};

const findBill = async (req, res) => {
  try {
    const id = req.params.id;

    let data = await salesModules.findById(id);
    res.json({
      data: data,
      Message: "Your Data ",
    });
  } catch (err) {
    res.status(400).json({
      Error: "Some thing.. error",
      details: err,
    });
  }
};

const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    const cencalBill = await salesModules.findByIdAndDelete(id);
    res.json({
      data: cencalBill,
      Message: "Bill Was Deleted",
    });
  } catch (error) {}
};

const UpdateSalebill = async (req, res) => {
  try {
    const updateBill = await salesModules.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateBill) {
      res.json({
        message: "bill not find",
      });
      res.status(200).json({
        data: updateBill,
        message: "Bill Updated",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const currentDateSales = async (req, res) => {
  try {
    const today = moment().format("D/M/YYYY");

    const todaySales = await salesModules.find({ entrydate: today });

    res.status(200).json({
      data: todaySales,
      message: "Today’s entries fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch today’s entries" });
  }
};

module.exports = {
  saleBill,
  viewBills,
  findBill,
  deleteBill,
  currentDateSales,
  UpdateSalebill,
};
