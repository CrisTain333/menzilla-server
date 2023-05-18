const { config } = require("../config/bucket.config");
const ProductModal = require("../models/ProductModal");
const ShopModal = require("../models/ShopModal");

exports.createProductHandler = async (req, res) => {
  const productData = req.body;
  console.log(productData);
  const files = req.files;
  console.log(files);

  const bucket = config.storage().bucket(process.env.STORAGE_BUCKET);
  const folderName = "Menzilla-storage/products/";

  try {
    const shopId = productData.shopId;
    const shop = await ShopModal.findById(shopId);
    if (!shop) {
      return { message: "Shop Id is invalid!", status: 400 };
    } else {
      const fileUrls = [];
      // Upload each file to Firebase Storage and get the download URLs
      for (const file of files) {
        const filename = Date.now() + "-" + file.originalname;
        const destination = folderName + filename;
        const options = {
          destination: destination,
          metadata: {
            contentType: `multipart/form-data`,
          },
        };
        await bucket.upload(file.buffer, options);

        const [url] = await bucket.file(destination).getSignedUrl({
          action: "read",
          expires: "03-01-2500", // Set an appropriate expiry date or duration
        });

        fileUrls.push(url);
      }

      productData.images = fileUrls;
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
