import React from "react";

function BrandHeader() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">0›</span>
        <span className="brand-name">0 TO SHIPPED <span>/ RESUME PARSER</span></span>
      </div>
      <div className="top-note"><span className="live-dot" aria-hidden="true" /> FRONT-END DEMO</div>
    </header>
  );
}

export default BrandHeader;
