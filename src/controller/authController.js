const authService = require("../services/authServices");

const registerUser = async (req, res, next) => {
  try {
    const result = await authService.handleRegisterUser(req, res);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const result = await authService.handleVerifyEmail(req, res);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    res.json({ status: 500, message: error?.message });
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req, res);
    res.send({
      status: result?.status,
      message: result?.message,
      token: result?.token,
      user: result?.usr,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, verifyEmail, login };
