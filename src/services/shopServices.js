const { config } = require("../config/bucket.config");
const ShopModal = require("../models/ShopModal");
const bcrypt = require("bcrypt");

exports.handleShopRegister = async (req, res) => {
  const shopData = req.body;
  const file = req.file;

  const bucket = config.storage().bucket(process.env.STORAGE_BUCKET);
  const folderName = "Menzilla-storage/";
  const fileUpload = bucket.file(folderName + file.originalname);

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on("error", (error) => {
    console.log(error);
  });
  const data = await stream.on("finish", async () => {
    const accessUrl = await fileUpload.getSignedUrl({
      action: "read",
      expires: "01-01-2025",
    });

    const hashedPassword = await bcrypt.hash(shopData?.password, 10);

    let result = await ShopModal.create({
      name: shopData?.shopName,
      email: shopData?.email,
      shopProfile: accessUrl[0],
      phoneNumber: shopData?.phone,
      address: shopData?.address,
      zipCode: shopData?.zipCode,
      password: hashedPassword,
    });
    return result;
  });
  stream.end(file.buffer);

  return { status: 201, message: "shop created successfully" };
};
