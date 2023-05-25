const express = require("express");
const router = express.Router();

const {
  registerShop,
  verifySellerEmail,
  sellerLogin,
  getSeller,
} = require("../../controller/shopController");
const newUploadSystem = require("../../middleware/newUpload");

router.post("/register", newUploadSystem.single("shopProfile"), registerShop);
router.post("/login", sellerLogin);
router.post("/verify-email", verifySellerEmail);
router.get("/seller", getSeller);
// router.post("/create-product");

module.exports = router;
