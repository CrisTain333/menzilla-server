const { config } = require("../config/bucket.config");
const ShopModal = require("../models/ShopModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createActivationToken, sendEmail } = require("../utils/common/index");

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
    } else if (!file) {
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

      const NewShopData = {
        name: shopData?.shopName,
        email: shopData?.email,
        shopProfile: accessUrl[0],
        phoneNumber: shopData?.phone,
        address: shopData?.address,
        zipCode: shopData?.zipCode,
        password: hashedPassword,
        isEmailVerified: false,
      };

      const activationToken = createActivationToken(NewShopData);
      const activationUrl = `${process.env.FRONT_END_BASE_URL}/auth/seller-activation?token=${activationToken}`;
      const r = await sendEmail(NewShopData, activationUrl);
      let result = await ShopModal.create(NewShopData);
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

// ---------------------- handle Verify Email ----------------------
exports.handleSellerEmailVerify = async (req, res) => {
  const { token } = req.query;
  const newShop = await jwt.verify(token, process.env.JWT_SECRET);
  if (!newShop) {
    return { message: "Invalid token", status: 400 };
  }
  const { email } = newShop;

  // Check if the user already exists
  const existingShop = await ShopModal.findOne({ $or: [{ email }] });

  if (existingShop?.isEmailVerified) {
    return { status: 400, message: "Email already Verified" };
  }
  const user = await ShopModal.findOneAndUpdate(
    { email },
    { isEmailVerified: true }
  );

  return { message: "user created", status: 201 };
};
