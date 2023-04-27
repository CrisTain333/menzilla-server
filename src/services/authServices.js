let SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
// const UserModel = require("../models/UserModel");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createActivationToken, sendEmail } = require("../utils/common");

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
    }
    // Hash the plain password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to database
    const user = {
      name,
      email,
      password: hashedPassword,
      phone,
    };

    // Create a activation Token
    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/auth/email-verify?token=${activationToken}`;
    const result = await sendEmail(user, activationUrl);
    console.log(result);

    // send success message
    return {
      message: `please check your email:- ${user.email} to activate your account!`,
      status: 201,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};

// ---------------------- handle Verify Email ----------------------
exports.handleVerifyEmail = async (req, res) => {
  const { token } = req.query;
  return { message: token, status: 201 };
};

// ---------------------- handle login ----------------------
