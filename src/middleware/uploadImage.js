const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function uploadMultipleFiles(files) {
  try {
    const uploadResults = [];

    // Loop through the files and upload each one
    for (const file of files) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "Menzilla/Products",
      });
      uploadResults.push(uploadResult.secure_url);
    }

    return uploadResults;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
}

module.exports = { uploadMultipleFiles };
