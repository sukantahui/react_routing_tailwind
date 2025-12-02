import React from "react";

export default function Topic3() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Setting Up Environment: Browser, VS Code & Live Server
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        Getting started requires just a few tools. The simplest setup uses only 
        a browser and a code editor.
      </p>

      <ol className="list-decimal ml-5 text-slate-300 text-sm space-y-1">
        <li><strong>Browser:</strong> Chrome or Firefox recommended</li>
        <li><strong>VS Code Editor:</strong> Free and powerful</li>
        <li><strong>Extensions:</strong> Live Server for instant preview</li>
      </ol>

      <h3 className="text-lg text-slate-200 font-semibold">Live Server Example</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`Right-click → Open with Live Server`}
      </pre>

      <p className="text-slate-400 text-sm">
        This auto-refreshes your webpage on every save.
      </p>

    </div>
  );
}
