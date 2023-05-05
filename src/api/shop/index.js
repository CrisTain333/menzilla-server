const express = require("express");
const router = express.Router();

const {
  registerShop,
  verifySellerEmail,
} = require("../../controller/shopController");
const upload = require("../../middleware/upload");

router.post("/register", upload.single("shopProfile"), registerShop);
router.post("/verify-email", verifySellerEmail);

module.exports = router;
