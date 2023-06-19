const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const { uploadMultipleFiles } = require("../middleware/uploadImage");
const bcrypt = require("bcrypt");

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

    const result = await UserModel.findOneAndUpdate(
      { _id: userId },
      { profilePicture: imageUrl[0] },
      { new: true }
    );
    // result.save();
    console.log(result);

    // console.log(userId, imageUrl);
    return { message: "Profile Picture updated ", status: 200 };
  } catch (error) {
    console.log(error?.message);
    return { message: "Fail to upload image", status: 500 };
  }
};

exports.updateProfile = async (req) => {
  const { userId } = req.query;
  const { name, email, phone, password } = req.body;

  const user = await UserModel.findById(userId);
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return {
      message: "Wrong Password",
      status: 400,
    };
  }

  try {
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { name, email, phone },
      { new: true }
    );

    return { message: "Profile Updated Successfully", status: 200 };
  } catch (error) {
    console.log(error?.message);
    return { message: "Fail to Update Profile", status: 500 };
  }
};
