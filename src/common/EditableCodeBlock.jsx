import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";

export default function EditableCodeBlock({
  initialCode = "",
  language = "javascript",
  fileName = "example.js",
}) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const runCode = () => {
    try {
      let captured = "";

      const fakeConsole = {
        log: (...args) => (captured += args.join(" ") + "\n"),
        error: (...args) => (captured += "ERROR: " + args.join(" ") + "\n"),
      };

      const fn = new Function("console", code);
      fn(fakeConsole);

      setOutput(captured || "(no output)");
    } catch (err) {
      setOutput("❌ Error: " + err.message);
    }
  };

  return (
    <div className="my-6">

      {/* File header */}
      <div className="flex justify-between bg-slate-800 px-3 py-2 rounded-t-xl text-xs text-slate-300 border border-slate-700">
        <span>{fileName}</span>
        <span className="uppercase">{language}</span>
      </div>

      {/* Editable area */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="w-full h-40 font-mono text-sm p-4 bg-slate-950 text-slate-200 border-x border-b border-slate-700 rounded-b-xl focus:outline-none"
      />

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={copyCode}
          className="px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-600 text-xs"
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={runCode}
          className="px-3 py-1 bg-emerald-700 text-white rounded hover:bg-emerald-600 text-xs"
        >
          Run Code
        </button>
      </div>

      {/* Highlighted preview */}
      <pre className="mt-3 rounded-xl bg-slate-900 p-4 overflow-auto border border-slate-700">
        <code className={`language-${language}`}>{code}</code>
      </pre>

      {/* Output window */}
      {output && (
        <div className="mt-3 bg-black text-green-300 p-3 rounded-lg text-xs whitespace-pre-wrap border border-slate-700">
          <strong className="text-sky-300">Output:</strong>
          <br />
          {output}
        </div>
      )}
    </div>
  );
}
