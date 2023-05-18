const express = require("express");
const router = express.Router();

const authRoute = require("../api/auth/index");
const userRoute = require("../api/user/index");
const shopRoute = require("../api/shop/index");
const productRoute = require("../api/product/index");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/shop", shopRoute);
router.use("/product", productRoute);

module.exports = router;
