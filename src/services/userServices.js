const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const { uploadMultipleFiles } = require("../middleware/uploadImage");

exports.handleGetUser = async (req, res) => {
  const auth_Token = req.header("Authorization");
  const token = auth_Token.split(" ")[1];

  const id = jwt.verify(token, process.env.JWT_SECRET);
  const user = await UserModel.findById(id.userId);

  return { status: 200, message: "success", user };
};

exports.updateUserProfilePic = async (req) => {
  const file = req.file;
  const { userId } = req.query;
  console.log("got hit");
  try {
    const shopImage = [file];
    const imageUrl = await uploadMultipleFiles(shopImage);
    console.log(userId, imageUrl);
    return { message: "ok", status: 200 };
  } catch (error) {
    console.log(error?.message);
    return { message: "fail", status: 500 };
  }
};
