import mongoose, { ConnectOptions } from "mongoose";
require("dotenv").config();
const connectToDatabase = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
      } as ConnectOptions)
      .then((res) => {
        console.log("Connected to API Database");
      })
      .catch((err) => {
        console.log(`Database connection error occurred `, err);
      });
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};
export default connectToDatabase;
