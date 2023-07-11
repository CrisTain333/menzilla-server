// const { uploadMultipleFiles } = require("../middleware/uploadImage");
const { ObjectId } = require("mongodb");
const {
  uploadMultipleFiles,
} = require("../middleware/uploadImage");
const ProductModal = require("../models/ProductModal");
const ShopModal = require("../models/ShopModal");

exports.createProductHandler = async (req, res) => {
  const productData = req.body;
  const files = req.files;

  try {
    const shopId = productData.shopId;
    const shop = await ShopModal.findById(shopId);
    if (!shop) {
      return {
        message: "Shop Id is invalid!",
        status: 400,
      };
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
    return {
      status: 500,
      message: error.toString(),
      data: req?.body,
    };
  }
};

exports.getProducts = async (req, res) => {
  try {
    const limit = 6;
    const { sellerId } = req.query;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    if (!sellerId) {
      return {
        status: 500,
        message: "seller id is required",
      };
    }
    const count = await ProductModal.find({
      shopId: sellerId,
    }).countDocuments();
    const products = await ProductModal.find({
      shopId: sellerId,
    })
      .skip(skip)
      .limit(parseInt(limit));
    return {
      message: "ok",
      status: 200,
      data: products,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    };
  } catch (error) {
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

exports.getAllProductFromDb = async () => {
  const limit = 6;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const count = await ProductModal.find(
    {}
  ).countDocuments();
  const result = await ProductModal.find({})
    .skip(skip)
    .limit(parseInt(limit));

  return {
    status: 200,
    message: "ok",
    data: result,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page),
  };
};

exports.previewShopProducts = async (id) => {
  const products = await ProductModal.find({ shopId: id });
  return {
    message: "success",
    status: 200,
    data: products,
  };
};
