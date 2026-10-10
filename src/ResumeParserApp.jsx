import React, { useEffect, useRef, useState } from "react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const presentSkills = ["React", "TypeScript", "REST APIs", "Accessibility", "Git"];
const missingSkills = ["Next.js", "Testing", "CI/CD"];

function formatFileSize(bytes) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" />
      <path d="M5 14v4.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V14" />
    </svg>
  );
}

function PrivacyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="4" y="8" width="12" height="9" rx="1.5" />
      <path d="M7 8V5.5a3 3 0 0 1 6 0V8m-3 4v2" />
    </svg>
  );
}

function ResumeParserApp() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
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

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files[0]);
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">0›</span>
          <span className="brand-name">0 TO SHIPPED <span>/ RESUME PARSER</span></span>
        </div>
        <div className="top-note"><span className="live-dot" aria-hidden="true" /> FRONT-END DEMO</div>
      </header>

      <main>
        <section className="intro" aria-labelledby="page-title">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" /> THE FIRST STEP TO YOUR NEXT ROLE</p>
            <h1 id="page-title">Make your next move<br /><em>with a little more clarity.</em></h1>
          </div>
          <p className="intro-aside">A quick read on your resume: what’s working, what’s missing, and where to focus next.</p>
        </section>

        <section className="workspace" aria-label="Resume scoring tool">
          <div className="upload-panel">
            <div className="section-top">
              <h2 className="section-label">Your resume</h2>
              <span className="step">01 / UPLOAD</span>
            </div>
            <p className="upload-copy">Upload a PDF to preview the report flow. Results stay as sample data.</p>

            <div
              className={`drop-zone${isDragging ? " is-over" : ""}`}
              onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="upload-icon"><UploadIcon /></div>
              <p className="drop-title">Drop your resume here</p>
              <p className="drop-subtitle">or choose a file from your device</p>
              <label className="browse-button" htmlFor="resume-file">Browse PDF <span aria-hidden="true">↗</span></label>
              <input
                ref={fileInputRef}
                id="resume-file"
                type="file"
                accept="application/pdf,.pdf"
                aria-label="Choose a PDF resume"
                onChange={(event) => handleFile(event.target.files[0])}
              />
              <span className="file-limit">PDF ONLY · UP TO 10 MB</span>
            </div>

            {file && (
              <div className="selected-file" aria-live="polite">
                <span className="file-symbol" aria-hidden="true">PDF</span>
                <div className="file-detail">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">{formatFileSize(file.size)} · READY TO SCAN</p>
                </div>
                <span className="file-check" aria-label="Ready">&#10003;</span>
              </div>
            )}

            {error && <p className="error-message" role="alert">{error}</p>}
            <p className="privacy-note"><PrivacyIcon /> Demo only. Your file stays in this browser.</p>
          </div>

          <div className="report-panel" aria-label="Resume score report">
            <div className="report-heading">
              <h2 className="section-label">Resume snapshot</h2>
              <span className="report-status"><span className="live-dot" aria-hidden="true" />{file ? "SCANNED · MOCK" : "SAMPLE REPORT"}</span>
            </div>

            <div className={`report-content${isScanning ? " is-loading" : ""}`} aria-live="polite">
              <div className="score-area">
                <div className="score-ring" role="img" aria-label="Sample resume score: 78 out of 100">
                  <div className="score-inner"><span className="score-number">78</span><span className="score-outof">/ 100</span></div>
                </div>
                <div>
                  <p className="score-caption">YOUR RESUME SCORE</p>
                  <p className="score-verdict">A solid start.</p>
                  <p className="score-description">Good foundations are here. A few in-demand skills could make your profile even stronger.</p>
                </div>
              </div>

              <div className="skills-header">
                <h3 className="skills-title">Skills check</h3>
                <span className="skills-count">{presentSkills.length} FOUND · {missingSkills.length} TO ADD</span>
              </div>

              <div className="skill-group">
                <p className="skill-group-heading"><span className="skill-marker present" /> PRESENT IN YOUR RESUME</p>
                <div className="skill-list">{presentSkills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
              </div>

              <div className="skill-group">
                <p className="skill-group-heading"><span className="skill-marker missing" /> NOT SPOTTED THIS TIME</p>
                <div className="skill-list">{missingSkills.map((skill) => <span className="skill-chip missing" key={skill}>{skill}</span>)}</div>
              </div>

              <div className="report-footer">
                <span>{file ? file.name.toUpperCase() : "EXAMPLE FRONTEND RESUME"}</span>
                {file && <button className="clear-button" type="button" onClick={clearFile}>Clear file</button>}
              </div>
            </div>
          </div>
        </section>

        <footer className="page-foot"><span>0 TO SHIPPED · YOUR CAREER, IN PROGRESS</span><span>MOCK RESULTS · NOT A REAL RESUME ANALYSIS</span></footer>
      </main>
    </div>
  );
}

export default ResumeParserApp;