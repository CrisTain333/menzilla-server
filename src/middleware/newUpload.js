const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.originalname;
    file.originalname = fileName;
    cb(null, fileName);
  },
});

let newUploadSystem = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.fieldname === "images" ||
      file.fieldname === "shopProfile" ||
      file.fieldname === "profilePicture"
    ) {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/docx"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only .jpg .jpeg .png .pdf .docx are allowed"));
      }
    }
  },
});

module.exports = newUploadSystem;
