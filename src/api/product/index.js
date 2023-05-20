const express = require("express");
const { createProduct } = require("../../controller/productController");
const upload = require("../../middleware/upload");
const newUploadSystem = require("../../middleware/newUpload");
// const { newUploadSystem } = require("../../middleware/newUpload");
const router = express.Router();

router.post("/create-product", newUploadSystem.array("images"), createProduct);

module.exports = router;
