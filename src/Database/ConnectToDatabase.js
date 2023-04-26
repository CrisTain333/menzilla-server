const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(" Connected To Database ".gray);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
