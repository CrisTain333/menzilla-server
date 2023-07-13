const express = require("express");
const {
  registerUser,
  verifyEmail,
  login,
  resendEmail,
} = require("../../controller/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/resend-email", resendEmail);

module.exports = router;
