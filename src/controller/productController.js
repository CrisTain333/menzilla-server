const productServices = require("../services/productServices");
const createProduct = async (req, res, next) => {
  try {
    const result = await productServices.createProductHandler(req, res);
    res.send({
      status: result?.status,
      message: result?.message,
      data: result?.data,
    });
  } catch (error) {
    res.json({ status: 500, message: error?.message });
    next(error);
  }
};

// Get all Products Of Shop
const getShopProducts = async (req, res, next) => {
  try {
    const result = await productServices.getProducts(req, res);
    res.send({
      status: result?.status,
      message: result?.message,
      data: result?.data,
    });
  } catch (error) {
    res.json({ status: 500, message: error?.message });
    next(error);
  }
};

// Get all Products Of Shop
const deleteProduct = async (req, res, next) => {
  try {
    const result = await productServices.deleteProductFromDb(req);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    res.json({ status: 500, message: error?.message });
    next(error);
  }
};

module.exports = { createProduct, getShopProducts, deleteProduct };
