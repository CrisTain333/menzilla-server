const express = require("express");
const router = express.Router();

const authRoute = require("../api/auth/index");
const userRoute = require("../api/user/index");
const shopRoute = require("../api/shop/index");
const productRoute = require("../api/product/index");
const paymentRoute = require("../api/payment/index");
const orderRoute = require("../api/order/index");
const chatRoute = require("../api/chat/index");
const contactRoute = require("../api/contact/index");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/shop", shopRoute);
router.use("/product", productRoute);
router.use("/payment", paymentRoute);
router.use("/orders", orderRoute);
router.use("/chat", chatRoute);
router.use("/contact-us", contactRoute);

module.exports = router;
