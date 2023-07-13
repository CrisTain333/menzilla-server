let SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
// const UserModel = require("../models/UserModel");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createActivationToken,
  sendEmail,
} = require("../utils/common");

// ---------------------- handle Register ----------------------
exports.handleRegisterUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    if ((!name, !email, !password, !phone)) {
      return {
        status: 400,
        message: "All fields are required",
      };
    }
    // Check if the user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email }],
    });
    if (existingUser) {
      return {
        status: 400,
        message: "Email already in use",
      };
    }
    // Hash the plain password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to database
    const user = {
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      phone,
    };

    // Create a activation Token
    const activationToken = createActivationToken(user);

    const activationUrl = `${process.env.FRONT_END_BASE_URL}/auth/email-verify?token=${activationToken}`;
    const result = await sendEmail(user, activationUrl);
    const data = await UserModel.create(user);
    // send success message
    return {
      message: `account created successfully`,
      status: 201,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

// ---------------------- handle Verify Email ----------------------
exports.handleVerifyEmail = async (req, res) => {
  const { token } = req.query;
  const newUser = await jwt.verify(
    token,
    process.env.JWT_SECRET
  );
  if (!newUser) {
    return { message: "Invalid token", status: 400 };
  }
  const { email } = newUser;

  // Check if the user already exists
  const existingUser = await UserModel.findOne({
    $or: [{ email }],
  });

  if (existingUser?.isEmailVerified) {
    return {
      status: 400,
      message: "Email already Verified",
    };
  }
  const user = await UserModel.findOneAndUpdate(
    { email },
    { isEmailVerified: true }
  );

  return { message: "user created", status: 201 };
};

// ---------------------- handle login ----------------------

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // all fields are required
    if ((!email, !password)) {
      return {
        status: 401,
        message: "All fields are required",
      };
    }

    const user = await UserModel.findOne({ email });
    // check the user exist in Database Or Not
    if (!user) {
      return { message: "User Not Found", status: 404 };
    }

    if (!user?.isEmailVerified) {
      return { message: "email not verified", status: 404 };
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    //Check User Password
    if (!isMatch) {
      return { status: 401, message: "invalid credential" };
    }

    // Generate Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // send token as response
    return {
      status: 201,
      message: "Login successful",
      token,
      usr: {
        _id: user?._id,
        email: user?.email,
        name: user?.name,
        phone: user?.phone,
        profilePicture: user?.profilePicture,
      },
    };
  } catch (error) {
    console.error(`${error.message}`);
    return { status: 500, message: error.toString() };
  }
};

exports.handleResendEmail = async (data) => {
  // data;
  console.log(data);
  return {
    status: 200,
    message: "Verification Email sended",
  };
};
