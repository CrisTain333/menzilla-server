const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "menzilla",
  api_key: "784956655754399",
  api_secret: "2X--LsJJ30AvZredHBRJX7B1iAE",
});

async function uploadMultipleFiles(files) {
  try {
    const uploadResults = [];

    // Loop through the files and upload each one
    for (const file of files) {
      const uploadResult = await cloudinary.uploader.upload(file.path);
      uploadResults.push(uploadResult.secure_url);
    }

    return uploadResults;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
}

module.exports = { uploadMultipleFiles };
