const express = require("express");
const {
  registerUser,
  verifyEmail,
  login,
} = require("../../controller/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

module.exports = router;
