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

exports.addAddress = async (req) => {
  const data = req.body;
  const { userId } = req.query;

  try {
    const user = await UserModel.findById(userId);

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === data.addressType
    );
    if (sameTypeAddress) {
      return { message: "Address all ready exist", status: 500 };
    }

    const existsAddress = user.addresses.find(
      (address) => address._id === data._id
    );

    if (existsAddress) {
      Object.assign(existsAddress, data);
    } else {
      // add the new address to the array
      user.addresses.push(data);
    }

    await user.save();
    return {
      message: "Address added successfully",
      status: 200,
    };
  } catch (error) {
    return { message: "Fail to Add Address", status: 500 };
  }
};

exports.deleteAddress = async (req) => {
  const { addressId, userId } = req.query;
  try {
    const result = await UserModel.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );
    console.log(result);
    return {
      status: 200,
      message: "Address deleted successfully",
    };
  } catch (error) {
    return { message: "Fail to Delete The Address", status: 500 };
  }
};
