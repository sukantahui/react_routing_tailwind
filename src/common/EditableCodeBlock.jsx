import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

export default function EditableCodeBlockWithConsole({
  initialCode = "",
  language = "javascript",
}) {
  const editorRef = useRef(null);
  const [error, setError] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // ------------------------------------------
  // RUN CODE WITH CUSTOM CONSOLE CAPTURE
  // ------------------------------------------
  const runCode = () => {
    setError("");
    setConsoleOutput([]); // clear console before run

    const capturedLogs = [];
    const originalLog = console.log;
    const originalError = console.error;

    // Intercept console.log
    console.log = (...args) => {
      capturedLogs.push({ type: "log", message: args.join(" ") });
      originalLog(...args);
    };

    // Intercept console.error
    console.error = (...args) => {
      capturedLogs.push({ type: "error", message: args.join(" ") });
      originalError(...args);
    };

    try {
      // eslint-disable-next-line no-eval
      eval(editorRef.current.getValue());
      setConsoleOutput(capturedLogs);
    } catch (err) {
      setError("Runtime Error: " + err.message);
    }

    // Restore original console functions
    console.log = originalLog;
    console.error = originalError;
  };

  // ------------------------------------------
  // FORMAT CODE (using global Prettier)
  // ------------------------------------------
  const formatCode = () => {
    try {
      const prettier = window.prettier;
      const babel = window.prettierPlugins.babel;

      const formatted = prettier.format(editorRef.current.getValue(), {
        parser: "babel",
        plugins: [babel],
      });

      editorRef.current.setValue(formatted);
      setError("");
    } catch (err) {
      setError("Prettier Error: " + err.message);
    }
  };

  const copyCode = () =>
    navigator.clipboard
      .writeText(editorRef.current.getValue())
      .then(() => alert("Copied!"));

  return (
    <div className="border border-slate-700 rounded-xl bg-slate-900 overflow-hidden">

      {/* HEADER BUTTONS */}
      <div className="flex items-center justify-between bg-slate-800 px-3 py-2 text-xs">
        <span className="text-slate-400 font-semibold">Editable Code</span>

        <div className="flex gap-2">
          <button
            onClick={formatCode}
            className="px-2 py-1 rounded bg-sky-600 text-white hover:bg-sky-700"
          >
            Format
          </button>

          <button
            onClick={runCode}
            className="px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Run
          </button>

          <button
            onClick={copyCode}
            className="px-2 py-1 rounded bg-slate-600 text-white hover:bg-slate-700"
          >
            Copy
          </button>
        </div>
      </div>

      {/* MONACO EDITOR */}
      <Editor
        height="260px"
        defaultLanguage={language}
        defaultValue={initialCode}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />

      {/* ERROR PANEL */}
      {error && (
        <div className="bg-red-900/40 border-t border-red-600 px-3 py-2 text-red-300 text-xs">
          ⚠ {error}
        </div>
      )}

      {/* CONSOLE OUTPUT PANEL */}
      <div className="bg-black border-t border-slate-700 px-3 py-2 h-40 overflow-auto text-xs">
        <p className="text-slate-400 mb-1">Console Output:</p>

        {consoleOutput.length === 0 && (
          <p className="text-slate-600">No output yet.</p>
        )}

        {consoleOutput.map((item, index) => (
          <div
            key={index}
            className={`${
              item.type === "error" ? "text-red-400" : "text-emerald-300"
            }`}
          >
            {item.message}
          </div>
        ))}
      </div>
    </div>
  );
}
