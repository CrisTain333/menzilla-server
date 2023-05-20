const { uploadMultipleFiles } = require("../middleware/uploadImage");
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
      // const imageUrls = files.map(
      //   (file) => `${req.protocol}://${req.hostname}/uploads/${file.filename}`
      // );

      // productData.images = imageUrls;
      // productData.shop = shop;

      uploadMultipleFiles(files)
        .then((urls) => {
          console.log("Uploaded URLs:", urls);
          // Handle the URLs as per your application's needs
          // res.status(200).json({ urls });

          return {
            status: 201,
            message: "Product Create Successful",
          };
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle the error appropriately
          return {
            status: 500,
            message: error.toString(),
            data: req?.body,
          };
        });

      // await ProductModal.create(productData);
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
