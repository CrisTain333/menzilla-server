const express = require("express");
const router = express.Router();

const {
  registerShop,
  verifySellerEmail,
  sellerLogin,
  getSeller,
  changeShopProfile,
  updateShop,
} = require("../../controller/shopController");
const newUploadSystem = require("../../middleware/newUpload");

router.post(
  "/register",
  newUploadSystem.single("shopProfile"),
  registerShop
);
router.post("/login", sellerLogin);
router.post("/verify-email", verifySellerEmail);
router.get("/seller", getSeller);
router.patch(
  "/change-shop-profile",
  newUploadSystem.single("shopProfile"),
  changeShopProfile
);

router.put("/update-profile/:id", updateShop);
// router.get('/:id')

module.exports = router;
