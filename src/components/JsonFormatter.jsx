import React, { useState } from "react";

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState(`{\n  "project": "DSA Practical Lab",\n  "author": "Sukanta Hui",\n  "topics": ["Arrays", "Linked Lists", "Trees", "Sorting"],\n  "status": "Active"\n}`);
  const [indentSize, setIndentSize] = useState(2);
  const [errorMsg, setErrorMsg] = useState(null);
  const [copied, setCopied] = useState(false);

  // Format JSON
  const handleFormat = () => {
    try {
      if (!inputJson.trim()) return;
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, indentSize));
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Minify JSON
  const handleMinify = () => {
    try {
      if (!inputJson.trim()) return;
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download File
  const handleDownload = () => {
    const blob = new Blob([inputJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Metrics
  const charCount = inputJson.length;
  const lineCount = inputJson ? inputJson.split("\n").length : 0;
  const byteSize = new Blob([inputJson]).size;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-teal-500/20 text-teal-400 rounded-xl border border-teal-500/30 text-xl">
              <i className="bi bi-filetype-json"></i>
            </span>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
                JSON Formatter &amp; Validator Tool
              </h1>
              <p className="text-xs text-slate-400">
                Format, minify, validate, and convert JSON data structures instantly
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1.5 rounded-xl text-xs text-slate-400">
              <span>Indent:</span>
              <button
                onClick={() => setIndentSize(2)}
                className={`px-2 py-1 rounded font-mono ${
                  indentSize === 2 ? "bg-teal-500/20 text-teal-300 border border-teal-500/40" : "hover:text-slate-200"
                }`}
              >
                2 Spaces
              </button>
              <button
                onClick={() => setIndentSize(4)}
                className={`px-2 py-1 rounded font-mono ${
                  indentSize === 4 ? "bg-teal-500/20 text-teal-300 border border-teal-500/40" : "hover:text-slate-200"
                }`}
              >
                4 Spaces
              </button>
            </div>

            <button
              onClick={handleFormat}
              className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-sm font-semibold rounded-xl border border-teal-500/40 flex items-center gap-2 transition"
            >
              <i className="bi bi-magic"></i> Prettify
            </button>

            <button
              onClick={handleMinify}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition"
            >
              <i className="bi bi-[#101]"></i> Minify
            </button>
          </div>
        </div>

        {/* Status & Error Notification */}
        {errorMsg ? (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-3">
            <i className="bi bi-exclamation-triangle-fill text-lg"></i>
            <div>
              <span className="font-bold">Invalid JSON Syntax:</span> {errorMsg}
            </div>
          </div>
        ) : (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <i className="bi bi-check-circle-fill"></i>
            <span>Valid JSON Structure</span>
          </div>
        )}

        {/* Text Area Editor */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0">
          <div className="bg-slate-950/80 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Lines: <strong className="text-slate-200">{lineCount}</strong></span>
              <span>Chars: <strong className="text-slate-200">{charCount}</strong></span>
              <span>Size: <strong className="text-slate-200">{byteSize} B</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
              >
                <i className={`bi ${copied ? "bi-check2" : "bi-clipboard"}`}></i>
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
              >
                <i className="bi bi-download"></i> Download
              </button>
            </div>
          </div>

          <textarea
            value={inputJson}
            onChange={(e) => {
              setInputJson(e.target.value);
              try {
                if (e.target.value.trim()) JSON.parse(e.target.value);
                setErrorMsg(null);
              } catch (err) {
                setErrorMsg(err.message);
              }
            }}
            placeholder="Paste your JSON here..."
            className="w-full h-[420px] bg-slate-950 p-6 text-sm font-mono text-teal-300 focus:outline-none resize-none leading-relaxed"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
