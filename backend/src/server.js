import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is required. Set it in backend/.env before starting the API.");
}

await mongoose.connect(mongoUri);
console.log("Connected to MongoDB.");

const server = app.listen(port, () => {
  console.log(`Resume parser API listening on http://localhost:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => {
      mongoose.disconnect().then(() => process.exit(0));
    });
  });
}
