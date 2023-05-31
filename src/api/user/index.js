const express = require("express");
const {
  getUser,
  updateUser,
  updateProfilePicture,
} = require("../../controller/userController");
const newUploadSystem = require("../../middleware/newUpload");
const router = express.Router();

router.get("/me", getUser);
router.patch("/update-user", updateUser);
router.patch(
  "/update-profile-picture",
  newUploadSystem.single("profilePicture"),
  updateProfilePicture
);

module.exports = router;
