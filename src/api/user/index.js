const express = require("express");
const {
  getUser,
  updateProfilePicture,
  handleUpdateProfile,
  handleAddAddress,
  handleDeleteAddress,
  handleChangePassword,
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
router.patch("/add-address", handleAddAddress);
router.delete("/delete-address", handleDeleteAddress);
router.patch("/change-password", handleChangePassword);

module.exports = router;
