// const { uploadMultipleFiles } = require("../middleware/uploadImage");
const { ObjectId } = require("mongodb");
const { uploadMultipleFiles } = require("../middleware/uploadImage");
const ProductModal = require("../models/ProductModal");
const ShopModal = require("../models/ShopModal");

exports.createProductHandler = async (req, res) => {
  const productData = req.body;
  const files = req.files;
  console.log(productData);

  try {
    const shopId = productData.shopId;
    const shop = await ShopModal.findById(shopId);
    if (!shop) {
      return { message: "Shop Id is invalid!", status: 400 };
    } else {
      productData.shop = shop;
      const result = await uploadMultipleFiles(files);
      productData.images = result;
      await ProductModal.create(productData);

      return {
        status: 201,
        message: "Product Create Successful",
        data: result,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.toString(),
      data: req?.body,
    };
  }
};

exports.getProducts = async (req, res) => {
  try {
    const limit = 5;
    const { sellerId } = req.query;
    if (!sellerId) {
      return {
        status: 500,
        message: "seller id is required",
      };
    }
    const products = await ProductModal.find({ shopId: sellerId }).limit(limit);
    return { message: "ok", status: 200, data: products };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.toString(),
      data: req?.body,
    };
  }
};

exports.deleteProductFromDb = async (req) => {
  const { productId } = req.query;
  const filter = { _id: new ObjectId(productId) };

  await ProductModal.findByIdAndDelete(filter);
  return {
    status: 200,
    message: "Product Deleted Successful",
  };
};
