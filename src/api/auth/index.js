const express = require("express");
const {
  registerUser,
  verifyEmail,
} = require("../../controller/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);

module.exports = router;
