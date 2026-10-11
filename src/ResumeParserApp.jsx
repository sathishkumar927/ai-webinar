import React, { useEffect, useRef, useState } from "react";
import BrandHeader from "./components/BrandHeader.jsx";
import IntroSection from "./components/IntroSection.jsx";
import PageFooter from "./components/PageFooter.jsx";
import ResumeReportPanel from "./components/ResumeReportPanel.jsx";
import ResumeUploadPanel from "./components/ResumeUploadPanel.jsx";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function ResumeParserApp() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!file) {
      setIsScanning(false);
      return undefined;
    }

    setIsScanning(true);
    const timeoutId = window.setTimeout(() => setIsScanning(false), 500);
    return () => window.clearTimeout(timeoutId);
  }, [file]);

  function handleFile(nextFile) {
    setError("");
    if (!nextFile) return;

    if (!nextFile.name.toLowerCase().endsWith(".pdf") || (nextFile.type && nextFile.type !== "application/pdf")) {
      setError("That file doesn’t look like a PDF. Please choose a .pdf file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      setError("This file is over 10 MB. Choose a smaller PDF to continue.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFile(nextFile);
  }

  function clearFile() {
    setFile(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
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
          />
          <ResumeReportPanel file={file} isScanning={isScanning} onClearFile={clearFile} />
        </section>
        <PageFooter />
      </main>
    </div>
  );
}

export default ResumeParserApp;
