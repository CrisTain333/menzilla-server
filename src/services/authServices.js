let SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
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
    //     const apiKey =
    //       defaultClient.authentications[
    //         "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"
    //       ];

    //     apiKey.apiKey =
    //       "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";
    //     var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
    //     var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

    //     // # Define the campaign settings\
    // emailCampaigns.name = "Campaign sent via the API";
    // emailCampaigns.subject = "My subject";
    // emailCampaigns.sender = {"name": "From name", "email":"anshuman.kashyap@sendinblue.com"};
    // emailCampaigns.type = "classic";
    // htmlContent: 'Congratulations! You successfully sent this example campaign via the Sendinblue API.',

    // send success message
    return { message: "user registered successfully", status: 201 };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};

// ---------------------- handle login ----------------------
// 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
