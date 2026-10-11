import React, { useState } from "react";

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

function ResumeUploadPanel({ file, error, fileInputRef, onFileSelect, onAnalyze, isScanning }) {
  const [isDragging, setIsDragging] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    onFileSelect(event.dataTransfer.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (file && jobDescription.trim()) onAnalyze(file, jobDescription.trim());
  }

  return (
    <div className="upload-panel">
      <div className="section-top">
        <h2 className="section-label">Your resume</h2>
        <span className="step">01 / UPLOAD</span>
      </div>
      <p className="upload-copy">Add a resume and the job description you want to compare it with.</p>

      <form onSubmit={handleSubmit}>
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
          <label className="browse-button" htmlFor="resume-file">Browse PDF</label>
          <input
            ref={fileInputRef}
            id="resume-file"
            type="file"
            accept="application/pdf,.pdf"
            aria-label="Choose a PDF resume"
            onChange={(event) => onFileSelect(event.target.files[0])}
          />
          <span className="file-limit">PDF ONLY · UP TO 4 MB</span>
        </div>

        {file && (
          <div className="selected-file" aria-live="polite">
            <span className="file-symbol" aria-hidden="true">PDF</span>
            <div className="file-detail">
              <p className="file-name">{file.name}</p>
              <p className="file-size">{formatFileSize(file.size)} · READY TO COMPARE</p>
            </div>
            <span className="file-check" aria-label="Ready">&#10003;</span>
          </div>
        )}

        <label className="job-description-label" htmlFor="job-description">Job description</label>
        <textarea
          id="job-description"
          className="job-description-input"
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          placeholder="Paste the role requirements here..."
          maxLength={20000}
          required
          rows={5}
        />
        <button className="analyze-button" type="submit" disabled={!file || isScanning}>
          {isScanning ? "Comparing..." : "Compare resume"}
        </button>
      </form>

      {error && <p className="error-message" role="alert">{error}</p>}
      <p className="privacy-note"><PrivacyIcon /> PDF text is processed in memory and not stored. Only comparison results are saved.</p>
    </div>
  );
}

export default ResumeUploadPanel;
