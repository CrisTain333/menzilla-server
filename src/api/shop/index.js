const express = require("express");
const router = express.Router();

const {
  registerShop,
  verifySellerEmail,
  sellerLogin,
} = require("../../controller/shopController");
const upload = require("../../middleware/upload");

router.post("/register", upload.single("shopProfile"), registerShop);
router.post("/login", sellerLogin);
router.post("/verify-email", verifySellerEmail);

module.exports = router;
