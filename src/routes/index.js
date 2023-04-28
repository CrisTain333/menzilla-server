const express = require("express");
const router = express.Router();

const authRoute = require("../api/auth/index");
const userRoute = require("../api/user/index");

router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
