const shopServices = require("../services/shopServices");
const registerShop = async (req, res) => {
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

module.exports = { registerShop };
