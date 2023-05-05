const express = require("express");
const router = express.Router();

const { registerShop } = require("../../controller/shopController");
const upload = require("../../middleware/upload");

router.post("/register", upload.single("shopProfile"), registerShop);

module.exports = router;
