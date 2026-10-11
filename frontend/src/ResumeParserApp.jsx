import React, { useRef, useState } from "react";
import BrandHeader from "./components/BrandHeader.jsx";
import IntroSection from "./components/IntroSection.jsx";
import PageFooter from "./components/PageFooter.jsx";
import ResumeReportPanel from "./components/ResumeReportPanel.jsx";
import ResumeUploadPanel from "./components/ResumeUploadPanel.jsx";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

function ResumeParserApp() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  function handleFile(nextFile) {
    setError("");
    if (!nextFile) return;

    if (!nextFile.name.toLowerCase().endsWith(".pdf") || (nextFile.type && nextFile.type !== "application/pdf")) {
      setError("That file doesn’t look like a PDF. Please choose a .pdf file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      setError("This file is over 4 MB. Choose a smaller PDF to continue.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFile(nextFile);
    setResult(null);
  }

  function clearFile() {
    setFile(null);
    setError("");
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function analyzeResume(selectedFile, jobDescription) {
    setError("");
    setIsScanning(true);
    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("/api/analyses", { method: "POST", body: formData });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error || "The resume comparison could not be completed.");
      }
      setResult(body);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The resume comparison could not be completed.");
    } finally {
      setIsScanning(false);
    }
  }

  return (
    <div className="shell">
      <BrandHeader />
      <main>
        <IntroSection />
        <section className="workspace" aria-label="Resume scoring tool">
          <ResumeUploadPanel
            file={file}
            error={error}
            fileInputRef={fileInputRef}
            onFileSelect={handleFile}
            onAnalyze={analyzeResume}
            isScanning={isScanning}
          />
          <ResumeReportPanel file={file} result={result} isScanning={isScanning} onClearFile={clearFile} />
        </section>
        <PageFooter />
      </main>
    </div>
  );
}

export default ResumeParserApp;
