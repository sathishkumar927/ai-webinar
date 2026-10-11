import React from "react";

function ResumeReportPanel({ file, result, isScanning, onClearFile }) {
  return (
    <div className="report-panel" aria-label="Resume score report">
      <div className="report-heading">
        <h2 className="section-label">Resume snapshot</h2>
        <span className="report-status"><span className="live-dot" aria-hidden="true" />{result ? "KEYWORD MATCH" : "AWAITING RESUME"}</span>
      </div>

      <div className={`report-content${isScanning ? " is-loading" : ""}`} aria-live="polite">
        {result ? (
          <>
            <div className="score-area">
              <div
                className="score-ring"
                style={{ "--score": result.score }}
                role="img"
                aria-label={`Resume match score: ${result.score} out of 100`}
              >
                <div className="score-inner"><span className="score-number">{result.score}</span><span className="score-outof">/ 100</span></div>
              </div>
              <div>
                <p className="score-caption">MATCHING JOB SKILLS</p>
                <p className="score-verdict">{result.score >= 70 ? "Strong alignment." : result.score >= 40 ? "Some overlap." : "Room to grow."}</p>
                <p className="score-description">A keyword comparison of the skills in your resume and this job description. No AI analysis yet.</p>
              </div>
            </div>

            <div className="skills-header">
              <h3 className="skills-title">Skills check</h3>
              <span className="skills-count">{result.skillsFound.length} FOUND · {result.skillsMissing.length} MISSING</span>
            </div>

            <div className="skill-group">
              <p className="skill-group-heading"><span className="skill-marker present" /> FOUND IN YOUR RESUME</p>
              <div className="skill-list">{result.skillsFound.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
            </div>

            <div className="skill-group">
              <p className="skill-group-heading"><span className="skill-marker missing" /> NOT FOUND IN YOUR RESUME</p>
              <div className="skill-list">{result.skillsMissing.length
                ? result.skillsMissing.map((skill) => <span className="skill-chip missing" key={skill}>{skill}</span>)
                : <span className="skill-chip">No missing skills found</span>}
              </div>
            </div>

            <div className="report-footer">
              <span>{file ? file.name.toUpperCase() : "RESUME COMPARISON"}</span>
              {file && <button className="clear-button" type="button" onClick={onClearFile}>Clear file</button>}
            </div>
          </>
        ) : (
          <div className="report-empty">
            <p className="score-verdict">Your comparison will appear here.</p>
            <p className="score-description">Upload a PDF and paste a job description to see matching and missing skills.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeReportPanel;
