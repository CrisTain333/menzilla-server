const express = require("express");
const router = express.Router();

const testRoute = require("../api/Test/index");

router.use("/test", testRoute);

module.exports = router;
