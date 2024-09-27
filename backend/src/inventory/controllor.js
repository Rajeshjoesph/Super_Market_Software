const mongoose = require("mongoose");
const inventory = require("./module");
const stockUpdate = require("../stock_inventroy/module");

// ADD NEW PRODUCTS
const addProductdtl = async (req, res) => {
  try {
    let productencode = req.body.encode;

    // product deatil
    let findEncode = await inventory.findOne({ encode: productencode });

    if (findEncode) {
      return res.json({
        message: "Encode already exists",
      });
    }
    // code genrate
    const generateUniqueCode = () => {
      const timestamp = Date.now(); // Get current timestamp in milliseconds
      const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
      const uniqueCode = (
        timestamp.toString().slice(-3) + randomNum.toString().padStart(3, "0")
      ).slice(-4); // Combine and slice to get a 4-digit code
      return uniqueCode;
    };

    // Usage
    const itemCode = generateUniqueCode();

    const newProduct = {
      itemCode: itemCode,
      ...req.body,
    };

    // Add a new product
    const store = await inventory.create(newProduct);

    // find itemCode is exist or not in stock Inv
    let stockCodeFind = await stockUpdate.findOne({ itemCode: itemCode });
    console.log("data=>", stockCodeFind);

    if (stockCodeFind) {
      console.log(`Item with itemCode ${itemCode} exists.`);
      return res.json({
        data: store,
        message: "Product created successfully, but stock code already exists.",
      });
    } else {
      let stockCodeAdd = await stockUpdate.create({
        itemCode: itemCode,
        itemName: req.body.itemName,
        encode: req.body.encode,
        sellingPrices: req.body.sellingPrices,
        mrpPrices: req.body.mrpPrices,
      });
      // console.log(stockCodeAdd);
      return res.json({
        data: {
          product: store,
          stock: stockCodeAdd,
        },
        message: `Product and stock code created successfully \n product code: ${itemCode}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Error: error,
    });
  }
};
// Dispaly All Product Data
const dplAlProduct = async (req, res) => {
  try {
    const getAlProduct = await inventory.find();

    if (!getAlProduct) {
      res.json({
        message: "NO Data..",
      });
    }

    res.status(200).json({
      data: getAlProduct,
    });
  } catch (error) {
    return res.json({
      Error: error.message,
    });
  }
};

//Delete product
const delProduct = async (req, res) => {
  try {
    console.log("im working");

    let { id } = req.params;
    console.log(req.params);

    const delCode = await inventory.findOneAndDelete(id);

    if (!delCode || delCode.length == 0) {
      res.json({
        message: "data no found",
      });
    }
    res.json({
      data: delCode,
      message: "Iteam Delate Sucssesfilly",
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

//Get one product data by its id nos
const getItem = async (req, res) => {
  try {
    let { id } = req.params;
    let findItem = await inventory.findById(id);
    console.log(findItem);
    if (!findItem || findItem.length === 0) {
      res.json({
        message: "data not found",
      });
    }
    res.json({
      data: findItem,
      message: "data Get",
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

// Update product data
const itemEdit = async (req, res) => {
  try {
    const findItem = await inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!findItem) {
      res.json({
        message: "data not found",
      });
    }

    res.json({
      data: findItem,
      message: "data Get",
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

module.exports = {
  addProductdtl,
  dplAlProduct,
  delProduct,
  getItem,
  itemEdit,
};
