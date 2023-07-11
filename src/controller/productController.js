const productServices = require("../services/productServices");
const createProduct = async (req, res, next) => {
  try {
    const result =
      await productServices.createProductHandler(req, res);
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
    const result = await productServices.getProducts(
      req,
      res
    );
    res.send({
      status: result?.status,
      message: result?.message,
      data: result?.data,
      totalPages: result?.totalPages,
      currentPage: result?.currentPage,
    });
  } catch (error) {
    res.json({ status: 500, message: error?.message });
    next(error);
  }
};

// delete product from shop
const deleteProduct = async (req, res, next) => {
  try {
    const result =
      await productServices.deleteProductFromDb(req);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    res.json({ status: 500, message: error?.message });
    next(error);
  }
};
// Get all Products
const getAllProducts = async (req, res, next) => {
  try {
    const result =
      await productServices.getAllProductFromDb();
    res.send({
      status: result?.status,
      message: result?.message,
      data: result?.data,
      totalPages: result?.totalPages,
      currentPage: result?.currentPage,
    });
  } catch (error) {
    res.json({ status: 500, message: error?.message });
    next(error);
  }
};

const getPreviewShopProducts = async (req, res, next) => {
  try {
    const id = req.query.shopID;
    const result =
      await productServices.previewShopProducts(id);
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

module.exports = {
  createProduct,
  getShopProducts,
  deleteProduct,
  getAllProducts,
  getPreviewShopProducts,
};
