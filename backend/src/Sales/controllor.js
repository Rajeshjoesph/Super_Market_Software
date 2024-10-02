const { json } = require("express");
const salesModules = require("./module");
const stockUpdate = require("../stock_inventroy/module");
// bill entry
const saleBill = async (req, res) => {
  try {
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
    console.log(outBound);

    for (item of outBound.productDetail) {
      const { itemCode, qty, sellingRate, mrpPrices } = item;

      const stock = await stockUpdate.updateOne(
        { itemCode: itemCode },
        {
          $inc: { stockLevel: -qty },
        }
      );
      if (stock.matchedCount > 0) {
        console.log(
          `Updated stock for itemCode ${itemCode}: SoildOut by ${qty}`
        );
        console.log("Sale entry saved with Bill Code:", res.data.billCode);
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
  } catch (err) {
    res.status(500).json({
      Error: "Some thing was error",
      details: err,
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
    console.log(req.id);
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

module.exports = { saleBill, viewBills, findBill, deleteBill };
