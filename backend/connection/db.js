import mongoose from "mongoose";

const connectDB = async (DB_URI = process.env.MONGO_URI) => {
  try {
    const mongoURI = DB_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
    });

    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
