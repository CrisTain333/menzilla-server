const express = require("express");
const router = express.Router();

const testRoute = require("../api/Test/index");
const authRoute = require("../api/auth/index");

router.use("/test", testRoute);
router.use("/auth", authRoute);

module.exports = router;
