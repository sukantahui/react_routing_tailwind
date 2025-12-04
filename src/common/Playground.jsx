
import React, { Component } from "react";
import EditableCodeBlock from "./EditableCodeBlock";

export default class Playground extends Component {
  render() {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-8">

        {/* TITLE */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-sky-400">
            JavaScript Interactive Playground
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Experiment with JavaScript, HTML & CSS in real-time.  
            Built for Coder & AccoTax, Barrackpore —  
            learn by writing, running & debugging your own code.
          </p>
        </div>

        {/* PLAYGROUND AREA */}
        <div className="max-w-7xl mx-auto">
          <EditableCodeBlock
            defaultTab="javascript"
            fileBaseName="playground-snippet"
            initialSnippets={{
              javascript: `// Welcome to the JavaScript Playground!
// You can write any JS code here and click RUN.
// Or enable AUTO to execute automatically.

console.log("Welcome to Coder & AccoTax Playground!");

// Example: Simple DOM manipulation
const box = document.getElementById("demo-box");
if (box) {
  box.textContent = "JS updated this text!";
  box.style.padding = "10px";
  box.style.background = "#0ea5e9";
  box.style.color = "white";
}
`,
              html: `<!-- HTML Workspace -->
<h2 style="color:#38bdf8;">Playground Demo Box</h2>
<div id="demo-box">This will be modified by JavaScript…</div>

<!-- You can write any HTML here -->
<p style="margin-top:10px;">
  Edit the HTML, CSS and JS from the tabs above.
</p>
`,
              css: `/* CSS Workspace */
body {
  font-family: system-ui;
  margin: 12px;
  background: #020617;
  color: #e5e7eb;
}

#demo-box {
  border: 1px solid #64748b;
  padding: 8px;
  margin-top: 10px;
  border-radius: 6px;
}
`,
            }}
          />
        </div>
      </div>
    );
  }
}
