const express = require("express");
const {
  createProduct,
  getShopProducts,
  deleteProduct,
} = require("../../controller/productController");
const newUploadSystem = require("../../middleware/newUpload");
// const upload = require("../../middleware/upload");
// const newUploadSystem = require("../../middleware/newUpload");
const router = express.Router();

router.post("/create-product", newUploadSystem.array("images"), createProduct);
router.get("/shop-products", getShopProducts);
router.delete("/delete-product", deleteProduct);

module.exports = router;
