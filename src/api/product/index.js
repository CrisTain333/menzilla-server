const express = require("express");
const { createProduct } = require("../../controller/productController");
const upload = require("../../middleware/upload");
const router = express.Router();

router.post("/create-product", upload.array("images"), createProduct);

module.exports = router;
