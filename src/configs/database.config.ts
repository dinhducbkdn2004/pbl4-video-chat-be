import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const stringUrl: string = process.env.MONGODB_URL || "123";

const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(stringUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDb;
