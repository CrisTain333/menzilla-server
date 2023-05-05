const express = require("express");
const router = express.Router();

const authRoute = require("../api/auth/index");
const userRoute = require("../api/user/index");
const shopRoute = require("../api/shop/index");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/shop", shopRoute);

module.exports = router;
