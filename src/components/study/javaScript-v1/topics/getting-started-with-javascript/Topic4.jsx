import React from "react";

export default function Topic4() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Running JavaScript in Browser Console & Script Files
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        JavaScript can be executed in multiple ways. The browser console is 
        perfect for learning, while script files are used in real projects.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">1. Using Browser Console</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`console.log("Hello from console!");`}
      </pre>

      <p className="text-slate-400 text-sm">
        Press <strong>F12 → Console tab</strong> to run code directly.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">2. Using Script File</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm whitespace-pre-wrap">
{`<script src="app.js"></script>`}
      </pre>

    </div>
  );
}
