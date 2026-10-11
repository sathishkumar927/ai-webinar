import mongoose from "mongoose";
import app from "../backend/src/app.js";

let connectionPromise;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI)
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  await connectionPromise;
}

export default async function handler(request, response) {
  try {
    await connectDatabase();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    response.status(503).json({ error: "The database is unavailable. Try again shortly." });
    return;
  }

  app(request, response);
}
