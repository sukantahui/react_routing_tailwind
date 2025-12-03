import React, { useState } from "react";

export default function EditableCodeBlock({
  initialCode = "",
  height = "180px",
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Copied to clipboard!");
  };

  const formatCode = async () => {
    try {
      const prettier = await import(
        "https://cdn.jsdelivr.net/npm/prettier@3.2.5/standalone.mjs"
      );
      const parserBabel = await import(
        "https://cdn.jsdelivr.net/npm/prettier@3.2.5/plugins/babel.mjs"
      );
      const parserEstree = await import(
        "https://cdn.jsdelivr.net/npm/prettier@3.2.5/plugins/estree.mjs"
      );

      const formatted = await prettier.format(code, {
        parser: "babel",
        plugins: [parserBabel, parserEstree],
      });

      setCode(formatted);
      setError("");
    } catch (err) {
      setError("Prettier Error: " + err.message);
    }
  };


  const runCode = () => {
    try {
      let logs = [];
      const originalLog = console.log;

      console.log = (...args) => logs.push(args.join(" "));
      eval(code);
      console.log = originalLog;

      setOutput(logs.join("\n"));
      setError("");
    } catch (err) {
      setError(err.message);
      setOutput("");
    }
  };

  return (
    <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="text-sky-300 font-semibold">Editable Code</span>
        <div className="flex gap-2">
          <button
            onClick={copyCode}
            className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white"
          >
            Copy
          </button>
          <button
            onClick={formatCode}
            className="px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white"
          >
            Format
          </button>
          <button
            onClick={runCode}
            className="px-2 py-1 rounded bg-indigo-700 hover:bg-indigo-600 text-white"
          >
            Run
          </button>
        </div>
      </div>

      <textarea
        className="w-full bg-slate-950 text-slate-200 font-mono p-3 rounded border border-slate-700 text-sm"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
        style={{ height }}
      />

      <div className="bg-slate-800 rounded p-3 text-sm border border-slate-700 font-mono text-slate-200">
        <p className="text-sky-300 font-semibold mb-1">Output:</p>
        {error ? (
          <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
        ) : (
          <pre className="whitespace-pre-wrap">
            {output || "// Run the code to see output"}
          </pre>
        )}
      </div>
    </div>
  );
}
