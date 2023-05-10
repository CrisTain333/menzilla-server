const shopServices = require("../services/shopServices");
const registerShop = async (req, res, next) => {
  try {
    const result = await shopServices.handleShopRegister(req, res);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const verifySellerEmail = async (req, res, next) => {
  try {
    const result = await shopServices.handleSellerEmailVerify(req, res);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    res.json({ status: 500, message: error?.message });
    next(error);
  }
};

const sellerLogin = async (req, res, next) => {
  try {
    const result = await shopServices.handleSellerLogin(req, res);
    res.send({
      status: result?.status,
      message: result?.message,
      token: result?.token,
    });
  } catch (error) {
    res.json({ status: 500, message: error?.message });
    next(error);
  }
};
const getSeller = async (req, res) => {};
module.exports = { registerShop, verifySellerEmail, sellerLogin, getSeller };
