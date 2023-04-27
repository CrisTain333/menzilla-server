const express = require("express");
const router = express.Router();

const testRoute = require("../api/Test/index");
const authRoute = require("../api/auth/index");
const userRoute = require("../api/user/index");

router.use("/test", testRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
