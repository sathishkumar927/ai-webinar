import React from "react";

const presentSkills = ["React", "TypeScript", "REST APIs", "Accessibility", "Git"];
const missingSkills = ["Next.js", "Testing", "CI/CD"];

function ResumeReportPanel({ file, isScanning, onClearFile }) {
  return (
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
          {file && <button className="clear-button" type="button" onClick={onClearFile}>Clear file</button>}
        </div>
      </div>
    </div>
  );
}

export default ResumeReportPanel;
