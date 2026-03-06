import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb running");
  } catch (err) {
    console.log(err);
  }
};
