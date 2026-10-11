import React from "react";
import { createRoot } from "react-dom/client";
import ResumeParserApp from "./ResumeParserApp.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResumeParserApp />
  </React.StrictMode>,
);