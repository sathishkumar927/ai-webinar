import express from "express";
import multer from "multer";
import Analysis from "./models/Analysis.js";
import { compareResume } from "./services/compareResume.js";
import { extractPdfText } from "./services/extractPdfText.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024, files: 1, fields: 1, fieldSize: 80000 },
  fileFilter(_request, file, callback) {
    if (!file.originalname.toLowerCase().endsWith(".pdf")) {
      const error = new Error("Upload a PDF file to continue.");
      error.statusCode = 400;
      callback(error);
      return;
    }
    callback(null, true);
  },
});

router.get("/health", (_request, response) => {
  response.json({ status: "ok", database: "connected" });
});

router.post("/analyses", upload.single("resume"), async (request, response) => {
  if (!request.file) {
    response.status(400).json({ error: "Choose a PDF resume to continue." });
    return;
  }

  if (request.file.buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
    response.status(422).json({ error: "The uploaded file is not a valid PDF." });
    return;
  }

  const jobDescription = request.body.jobDescription?.trim();
  if (!jobDescription) {
    response.status(400).json({ error: "Paste a job description to continue." });
    return;
  }

  if (jobDescription.length > 20000) {
    response.status(413).json({ error: "The job description must be 20,000 characters or fewer." });
    return;
  }

  let resumeText;
  try {
    resumeText = await extractPdfText(request.file.buffer);
  } catch {
    response.status(422).json({ error: "Could not read this PDF. Try a valid, text-based PDF." });
    return;
  }

  if (!resumeText) {
    response.status(422).json({ error: "No selectable text was found in this PDF. Scanned resumes are not supported yet." });
    return;
  }

  const comparison = compareResume(resumeText, jobDescription);
  const savedAnalysis = await Analysis.create(comparison);
  response.status(201).json({
    id: savedAnalysis.id,
    score: savedAnalysis.score,
    skillsFound: savedAnalysis.skillsFound,
    skillsMissing: savedAnalysis.skillsMissing,
    totalSkills: savedAnalysis.totalSkills,
    createdAt: savedAnalysis.createdAt,
  });
});

const app = express();
app.use("/api", router);
app.use((error, _request, response, _next) => {
  if (error instanceof multer.MulterError) {
    const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    response.status(status).json({
      error: error.code === "LIMIT_FILE_SIZE"
        ? "This PDF is over 4 MB. Choose a smaller file."
        : "The upload could not be accepted. Check the file and try again.",
    });
    return;
  }
  if (error.statusCode) {
    response.status(error.statusCode).json({ error: error.message });
    return;
  }
  console.error("Request failed:", error);
  response.status(500).json({ error: "The comparison could not be saved. Check the server and database, then try again." });
});

export default app;
