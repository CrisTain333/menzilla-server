const ProductModal = require("../models/ProductModal");
const ShopModal = require("../models/ShopModal");

exports.createProductHandler = async (req, res) => {
  const productData = req.body;
  const files = req.files;

  try {
    const shopId = productData.shopId;
    const shop = await ShopModal.findById(shopId);
    if (!shop) {
      return { message: "Shop Id is invalid!", status: 400 };
    } else {
      const imageUrls = files.map(
        (file) => `${req.protocol}://${req.hostname}/uploads/${file.filename}`
      );

      productData.images = imageUrls;
      productData.shop = shop;

      await ProductModal.create(productData);

      return {
        status: 201,
        message: "Product Create Successful",
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
