const { config } = require("../config/bucket.config");

exports.handleShopRegister = (req, res) => {
  const data = req.body;
  const file = req.file;
  console.log(UserInfo, "line 6 from DocumentService");

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
};
