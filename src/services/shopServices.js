const { config } = require("../config/bucket.config");
const ShopModal = require("../models/ShopModal");
const bcrypt = require("bcrypt");

exports.handleShopRegister = async (req, res) => {
  try {
    const shopData = req.body;
    const file = req.file;

    const { shopName, email, password, address, phone, shopProfile, zipCode } =
      shopData;

    if (!shopName) {
      return { status: 400, message: "shope name  is  required" };
    } else if (!email) {
      return { status: 400, message: "email is  required" };
    } else if (!password) {
      return { status: 400, message: "password is  required" };
    } else if (!address) {
      return { status: 400, message: "address is  required" };
    } else if (!phone) {
      return { status: 400, message: "phone is  required" };
    } else if (!shopProfile) {
      return { status: 400, message: "shop profile is  required" };
    } else if (!zipCode) {
      return { status: 400, message: "zipCode  is  required" };
    }

    const existingUser = await ShopModal.findOne({ $or: [{ email }] });
    if (existingUser) {
      return { status: 400, message: "Email already in use" };
    }

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
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.toString(),
    };
  }
};
