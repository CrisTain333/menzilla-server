const { config } = require("../config/bucket.config");
const ShopModal = require("../models/ShopModal");

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
      expires: "03-17-2025",
    });

    let result = await ShopModal.create({
      email: UserInfo?.email,
      PublicURL: accessUrl[0],
      fileName: UserInfo?.filename,
    });
    return result;
  });
  stream.end(file.buffer);

  return { message: data };
};
