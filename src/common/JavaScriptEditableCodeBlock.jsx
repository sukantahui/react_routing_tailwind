import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Braces,
  Play,
  Wand2,
  Bug,
  RefreshCw,
  Copy,
  Download,
  Maximize2,
  Minimize2,
  LayoutList,
} from "lucide-react";

const JavaScriptEditableCodeBlock = ({
  initialCode = "",
  title = null,
}) => {
  const normalize = (s) =>
    (s || "")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");

  const [code, setCode] = useState(normalize(initialCode));
  const [error, setError] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [editorHeight, setEditorHeight] = useState(240);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [fontSize] = useState(14);
  const [theme] = useState("vs-dark");
  const [showConsole] = useState(true);

  const editorRef = useRef(null);

  // Update if initialCode changes
  useEffect(() => {
    setCode(normalize(initialCode));
  }, [initialCode]);

  // =========================
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    editor.onDidContentSizeChange(() => {
      const height = Math.max(editor.getContentHeight(), 180);
      setEditorHeight(height);
      editor.layout();
    });
  };

  // =========================
  const runCode = () => {
    setError("");
    setConsoleOutput([]);

    const captured = [];
    const originalLog = console.log;
    const originalErr = console.error;

    const formatValue = (v) =>
      typeof v === "object" ? JSON.stringify(v, null, 2) : String(v);

    console.log = (...args) => {
      captured.push({ type: "log", message: args.map(formatValue).join(" ") });
      originalLog(...args);
    };

    console.error = (...args) => {
      captured.push({
        type: "error",
        message: args.map(formatValue).join(" "),
      });
      originalErr(...args);
    };

    try {
      // eslint-disable-next-line no-eval
      eval(code);
      setConsoleOutput(captured);
    } catch (err) {
      setError(err.message);
    }

    console.log = originalLog;
    console.error = originalErr;
  };

  // =========================
  const lintCode = () => {
    try {
      new Function(code);
      setError("No syntax errors ✔️");
    } catch (err) {
      setError(err.message);
    }
  };

  // =========================
  const formatCode = () => {
    try {
      const prettier = window.prettier;
      const babel = window.prettierPlugins?.babel;

      if (!prettier || !babel) {
        setError("Prettier not loaded");
        return;
      }

      const formatted = prettier.format(code, {
        parser: "babel",
        plugins: [babel],
      });

      setCode(formatted);
      setError("");
    } catch (err) {
      setError("Format Error: " + err.message);
    }
  };

  // =========================
  const resetCode = () => {
    setCode(normalize(initialCode));
    setError("");
    setConsoleOutput([]);
  };

  // =========================
  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "snippet.js";
    a.click();

    URL.revokeObjectURL(url);
  };

  // =========================
  return (
    <div
      className={`border border-slate-700 rounded-xl bg-slate-900 ${
        isFullscreen ? "fixed inset-0 z-[9999] p-4" : ""
      }`}
    >
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center bg-slate-800 px-3 py-2 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Braces size={14} />
          {title && <span className="font-semibold">{title}</span>}
        </div>

        <div className="flex gap-2 flex-wrap">

          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className="px-2 py-1 bg-indigo-600 rounded text-white flex items-center gap-1"
          >
            <LayoutList size={14} /> Lines
          </button>

          <button
            onClick={formatCode}
            className="px-2 py-1 bg-sky-600 rounded text-white flex items-center gap-1"
          >
            <Wand2 size={14} /> Format
          </button>

          <button
            onClick={lintCode}
            className="px-2 py-1 bg-amber-600 rounded text-white flex items-center gap-1"
          >
            <Bug size={14} /> Lint
          </button>

          <button
            onClick={runCode}
            className="px-2 py-1 bg-emerald-600 rounded text-white flex items-center gap-1"
          >
            <Play size={14} /> Run
          </button>

          <button
            onClick={resetCode}
            className="px-2 py-1 bg-gray-600 rounded text-white flex items-center gap-1"
          >
            <RefreshCw size={14} /> Reset
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-2 py-1 bg-purple-600 rounded text-white flex items-center gap-1"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            Full
          </button>

          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="px-2 py-1 bg-slate-600 rounded text-white flex items-center gap-1"
          >
            <Copy size={14} /> Copy
          </button>

          <button
            onClick={downloadCode}
            className="px-2 py-1 bg-teal-600 rounded text-white flex items-center gap-1"
          >
            <Download size={14} /> Save
          </button>
        </div>
      </div>

      {/* ================= EDITOR ================= */}
      <Editor
        language="javascript"
        value={code}
        onChange={(value = "") => setCode(value)}
        height={editorHeight}
        theme={theme}
        onMount={handleEditorDidMount}
        options={{
          fontSize,
          minimap: { enabled: false },
          lineNumbers: showLineNumbers ? "on" : "off",
          scrollBeyondLastLine: false,
          padding: { top: 18, bottom: 18 },
        }}
      />

      {/* ================= ERROR ================= */}
      {error && (
        <div className="bg-red-900/40 border-t border-red-700 px-3 py-2 text-red-300 text-xs">
          ⚠ {error}
        </div>
      )}

      {/* ================= CONSOLE ================= */}
      {showConsole && (
        <div className="bg-black border-t border-slate-700 px-3 py-2 h-40 overflow-auto text-xs">
          <p className="text-slate-400 mb-1">Console Output:</p>

          {consoleOutput.length === 0 && (
            <p className="text-slate-600">No output yet.</p>
          )}

          {consoleOutput.map((line, index) => (
            <pre
              key={index}
              className={`whitespace-pre-wrap ${
                line.type === "error"
                  ? "text-red-400"
                  : "text-green-300"
              }`}
            >
              {line.message}
            </pre>
          ))}
        </div>
      )}
    </div>
  );
};

export default JavaScriptEditableCodeBlock;
