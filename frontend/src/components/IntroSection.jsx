import React from "react";

function IntroSection() {
  return (
    <section className="intro" aria-labelledby="page-title">
      <div>
        <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" /> THE FIRST STEP TO YOUR NEXT ROLE</p>
        <h1 id="page-title">Make your next move<br /><em>with a little more clarity.</em></h1>
      </div>
      <p className="intro-aside">A quick read on your resume: what’s working, what’s missing, and where to focus next.</p>
    </section>
  );
}

export default IntroSection;
