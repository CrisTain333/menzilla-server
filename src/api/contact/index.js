const express = require("express");
const router = express.Router();

router.post("/", handleContactUs);

module.exports = router;
