const { config } = require("../config/bucket.config");
const ShopModal = require("../models/ShopModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createActivationToken, sendEmail } = require("../utils/common/index");
const { uploadMultipleFiles } = require("../middleware/uploadImage");

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
    const shopImage = [file];
    const imageUrl = await uploadMultipleFiles(shopImage);

    const hashedPassword = await bcrypt.hash(shopData?.password, 10);

    const NewShopData = {
      name: shopData?.shopName,
      email: shopData?.email,
      shopProfile: imageUrl[0],
      phoneNumber: shopData?.phone,
      address: shopData?.address,
      zipCode: shopData?.zipCode,
      password: hashedPassword,
      isEmailVerified: false,
    };

    const activationToken = createActivationToken(NewShopData);
    const activationUrl = `${process.env.FRONT_END_BASE_URL}/auth/seller-activation?token=${activationToken}`;
    try {
      await sendEmail(NewShopData, activationUrl);
      console.log("email sended");
    } catch (error) {
      console.log(error?.message);
      console.log("email send fail");
    }
    let result = await ShopModal.create(NewShopData);
    return result;

    return { status: 201, message: "shop created successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.toString(),
    };
  }
};

// ---------------------- handle Verify Email ---------------------
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
  await ShopModal.findOneAndUpdate({ email }, { isEmailVerified: true });

  return { message: "user created", status: 201 };
};

// ---------------------------- handle Login  -----------------------
exports.handleSellerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // all fields are required
    if ((!email, !password)) {
      return { status: 401, message: "All fields are required" };
    }

    const shop = await ShopModal.findOne({ email });
    // check the user exist in Database Or Not
    if (!shop) {
      return { message: "Shop Details Not Found", status: 404 };
    }

    if (!shop?.isEmailVerified) {
      return { message: "email not verified", status: 404 };
    }

    const isMatch = await bcrypt.compare(password, shop?.password);
    //Check User Password
    if (!isMatch) {
      return { status: 401, message: "invalid credential" };
    }

    // Generate Token
    const token = jwt.sign({ shopId: shop._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // send token as response
    return {
      status: 201,
      message: "Login successful",
      token,
    };
  } catch (error) {
    console.error(`${error.message}`);
    return { status: 500, message: error.toString() };
  }
};

exports.handleGetSeller = async (req, res) => {
  try {
    const auth_Token = req.header("Authorization");
    const token = auth_Token.split(" ")[1];

    const id = jwt.verify(token, process.env.JWT_SECRET);
    const seller = await ShopModal.findById(id.shopId);
    const {
      _id,
      name,
      email,
      address,
      phoneNumber,
      role,
      shopProfile,
      zipCode,
      isEmailVerified,
      createdAt,
    } = seller;

    return {
      status: 200,
      message: "success",
      seller: {
        _id,
        name,
        email,
        address,
        phoneNumber,
        role,
        shopProfile,
        zipCode,
        isEmailVerified,
        createdAt,
      },
    };
  } catch (error) {
    console.error(`${error.message}`);
    return { status: 500, message: error.toString() };
  }
};
