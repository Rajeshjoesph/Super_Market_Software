const stockData = require("../stock_inventroy/module");

const openingStock = async (req, res) => {
  try {
    let rawData = req.body;
    const openStock = await stockData.create(rawData);
    res.json({
      data: openStock,
      message: "Stock Updated",
    });
  } catch (err) {
    res.json({
      Error: err,
    });
  }
};

const getStockDetail = async (req, res) => {
  try {
    const getData = await stockData.find();
    res.json({
      data: getData,
      message: "all inventory Data",
    });
  } catch (error) {
    res.json({
      Error: err,
    });
  }
};

module.exports = {
  openingStock,
  getStockDetail,
};
