import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true, min: 0, max: 100 },
    skillsFound: { type: [String], required: true },
    skillsMissing: { type: [String], required: true },
    totalSkills: { type: Number, required: true, min: 1 },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model("Analysis", analysisSchema);
