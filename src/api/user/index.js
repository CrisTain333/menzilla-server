const express = require("express");
const {
  getUser,
  updateProfilePicture,
  handleUpdateProfile,
  handleAddAddress,
} = require("../../controller/userController");
const newUploadSystem = require("../../middleware/newUpload");
const router = express.Router();

router.get("/me", getUser);
router.patch(
  "/update-profile-picture",
  newUploadSystem.single("profilePicture"),
  updateProfilePicture
);
router.patch("/update-profile", handleUpdateProfile);
router.post("/add-address", handleAddAddress);

module.exports = router;
