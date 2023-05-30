const express = require("express");
const { getUser, updateUser } = require("../../controller/userController");
const router = express.Router();

router.get("/me", getUser);
router.patch("/update-user", updateUser);
module.exports = router;
