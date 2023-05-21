const express = require("express");
const {
  createProduct,
  getShopProducts,
} = require("../../controller/productController");
const newUploadSystem = require("../../middleware/newUpload");
// const upload = require("../../middleware/upload");
// const newUploadSystem = require("../../middleware/newUpload");
const router = express.Router();

router.post("/create-product", newUploadSystem.array("images"), createProduct);
router.get("/shop-products", getShopProducts);

module.exports = router;
