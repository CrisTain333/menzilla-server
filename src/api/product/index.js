const express = require("express");
const { createProduct } = require("../../controller/productController");
const router = express.Router();

router.post("/create-product", createProduct);

module.exports = router;
