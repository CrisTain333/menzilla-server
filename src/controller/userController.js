const authServices = require("../services/userServices");
const getUser = async (req, res, next) => {
  try {
    const result = await authServices.handleGetUser(req, res);
    console.log(result);
    res.send({
      status: result?.status,
      message: result?.message,
      user: result?.user,
      role: result?.role,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getUser };
