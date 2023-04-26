const express = require("express");
const { testController } = require("../../controller/testController");
const router = express.Router();

router.use("/", testController);

module.exports = router;
