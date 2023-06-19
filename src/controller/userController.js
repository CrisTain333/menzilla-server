const authServices = require("../services/userServices");
const userService = require("../services/userServices");
const getUser = async (req, res, next) => {
  try {
    const result = await authServices.handleGetUser(req, res);
    console.log(result);
    res.send({
      status: result?.status,
      message: result?.message,
      user: result?.user,
      role: result?.role,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProfilePicture = async (req, res, next) => {
  try {
    const result = await userService.updateUserProfilePic(req);
    console.log(result);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleUpdateProfile = async (req, res, next) => {
  try {
    const result = await userService.updateProfile(req);
    console.log(result);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleAddAddress = async (req, res, next) => {
  try {
    const result = await userService.addAddress(req);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteAddress = async (req, res, next) => {
  try {
    const result = await userService.deleteAddress(req);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    next(error);
  }
};

const handleChangePassword = async (req, res, next) => {
  try {
    const result = await userService.changePassword(req);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  updateProfilePicture,
  handleUpdateProfile,
  handleAddAddress,
  handleDeleteAddress,
  handleChangePassword,
};
