const authService = require("../services/authServices");
// handle user register
const registerUser = async (req, res, next) => {
  try {
    const result = await authService.handleRegisterUser(req, res);
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

module.exports = { registerUser };
