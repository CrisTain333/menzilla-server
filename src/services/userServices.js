const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.handleGetUser = async (req, res) => {
  const auth_Token = req.header("Authorization");
  const token = auth_Token.split(" ")[1];

  const id = jwt.verify(token, process.env.JWT_SECRET);
  const user = await UserModel.findById(id.userId);

  return { status: 200, message: "success", user };
};
