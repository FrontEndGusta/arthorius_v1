import mongoose from "mongoose";

export default async function connect() {
  try {
    const mongoUri = process.env.MONGO;
    
    if (!mongoUri) {
      throw new Error("MongoDB connection string is not defined in the environment variables.");
    }

    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Optionally rethrow the error if you want it to propagate
  }
}
