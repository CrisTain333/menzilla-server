// const UserModel = require("../models/UserModel");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ---------------------- handle Register ----------------------
exports.handleRegisterUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    if ((!name, !email, !password, !phone)) {
      return { status: 400, message: "All fields are required" };
    }
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ $or: [{ email }] });
    if (existingUser) {
      return { status: 400, message: "Email already in use" };
    } else {
    }
    // Hash the plain password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to database
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    //
    await user.save();

    // send success message
    return { message: "user registered successfully", status: 201 };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};
