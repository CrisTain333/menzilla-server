const productServices = require("../services/productServices");
const createProduct = async (req, res, next) => {
  try {
    const result = await productServices.createProductHandler(req, res);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    res.json({ status: 500, message: error?.message });
    next(error);
  }
};

module.exports = { createProduct };
