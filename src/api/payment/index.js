const express = require("express");
const paymentController = require("../../controller/paymentController");
const router = express.Router();

router.post("/process", paymentController.paymentProcess);

module.exports = router;
