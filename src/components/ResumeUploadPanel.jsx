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

function ResumeUploadPanel({ file, error, fileInputRef, onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    onFileSelect(event.dataTransfer.files[0]);
  }

  return (
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
          onChange={(event) => onFileSelect(event.target.files[0])}
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
  );
}

export default ResumeUploadPanel;
