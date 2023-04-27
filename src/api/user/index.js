const express = require("express");
const { getUser } = require("../../controller/userController");
const router = express.Router();

router.get("/me", getUser);

module.exports = router;
