const express = require("express");
const createInvProduct = require("./controllor");

const router = express.Router();
router
  .route("/products")
  .post(createInvProduct.addProductdtl)
  .get(createInvProduct.dplAlProduct);

router
  .route("/productsview/:id")
  .delete(createInvProduct.delProduct)
  .get(createInvProduct.getItem)
  .put(createInvProduct.itemEdit);

module.exports = router;
