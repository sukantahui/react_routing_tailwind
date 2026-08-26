// ================================================
// EditablePythonCodeBlock.jsx
// Premium Python Editor + Runner (Monaco + Pyodide)
// Hybrid mode: basic Python first, heavy packages on demand
// Coder & AccoTax
// ================================================

import React, { Component } from "react";
import Editor from "@monaco-editor/react";

// Icons from lucide-react
import {
  Braces, // Python icon
  Download,
  Copy,
  Maximize2,
  Minimize2,
  RefreshCw,
  Eye,
  EyeOff,
  Play,
  LayoutList,
  Type,
} from "lucide-react";

// -------------------------------------------------
// Global Pyodide singleton + loaded packages set
// -------------------------------------------------
let pyodideInstance = null;
let pyodideReadyPromise = null;
const loadedPackages = new Set();

/**
 * Load Pyodide (singleton)
 */
async function getPyodide() {
  if (pyodideInstance) return pyodideInstance;

  if (!pyodideReadyPromise) {
    if (
      typeof window === "undefined" ||
      typeof window.loadPyodide === "undefined"
    ) {
      throw new Error(
        "Pyodide is not loaded. Please include pyodide.js in your HTML."
      );
    }

    pyodideReadyPromise = window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.0/full/",
    });
  }

  pyodideInstance = await pyodideReadyPromise;
  return pyodideInstance;
}

export default class EditablePythonCodeBlock extends Component {
  constructor(props) {
    super(props);

    const normalize = (s) => this.normalizeCode(s || "");
    const initialPython = normalize(props.initialCode || "");

    this.state = {
      // Core
      error: "",
      errorLine: null,
      consoleOutput: [],
      editorHeight: 240,

      // UI
      isFullscreen: false,
      showLineNumbers: true,
      autoRun: false,
      fontSize: 14,
      theme: "vs-dark", // Monaco theme id
      showConsole: true,

      // Menus
      showFontMenu: false,
      showThemeMenu: false,

      // Pyodide
      pyodideReady: false,
      loadingPyodide: false,
      loadingPackages: false,

      // Code
      code: initialPython,
    };

    this.editorRef = null;
    this.monaco = null;
    this.decorations = [];
    this.typingTimer = null;
  }

  // -----------------------------------------
  // Normalize escaped JSON-like code strings
  // -----------------------------------------
  normalizeCode = (str) => {
    if (typeof str !== "string") return "";
    return str
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  };

  // -----------------------------------------
  // Monaco Mount
  // -----------------------------------------
  handleEditorDidMount = (editor, monaco) => {
    this.editorRef = editor;
    this.monaco = monaco;

    this.applyMonacoTheme(this.state.theme);
    this.updateEditorHeight();

    // Auto-resize based on content
    editor.onDidContentSizeChange(() => this.updateEditorHeight());

    // Auto-run for Python
    editor.onDidChangeModelContent(() => {
      if (!this.state.autoRun) return;

      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => this.runCode(), 800);
    });
  };

  updateEditorHeight = () => {
    if (!this.editorRef) return;

    const contentHeight = this.editorRef.getContentHeight();
    const minHeight = 180;
    const newHeight = Math.max(contentHeight, minHeight);

    if (newHeight !== this.state.editorHeight) {
      this.setState({ editorHeight: newHeight }, () => {
        this.editorRef.layout();
      });
    }
  };

  // -----------------------------------------
  // Monaco Themes (VSCode style)
  // -----------------------------------------
  applyMonacoTheme = (themeName) => {
    if (!this.monaco) return;

    const themes = {
      dracula: {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#1e1e2e",
        },
      },
      "one-dark": {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#282c34",
        },
      },
      "solarized-dark": {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#002b36",
        },
      },
      "solarized-light": {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#fdf6e3",
        },
      },
      "github-dark": {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#0d1117",
        },
      },
      "github-light": {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#ffffff",
        },
      },
    };

    // Register custom themes
    Object.entries(themes).forEach(([id, def]) => {
      this.monaco.editor.defineTheme(id, def);
    });

    // Apply theme (built-in or custom)
    this.monaco.editor.setTheme(themeName);
  };

  // -----------------------------------------
  // Detect packages from import statements
  // Simple heuristic for numpy, pandas, matplotlib
  // -----------------------------------------
  detectPackages = (code) => {
    const pkgs = new Set();

    const checks = [
      { name: "numpy", pattern: /\bimport\s+numpy\b|\bfrom\s+numpy\s+import\b/ },
      {
        name: "pandas",
        pattern: /\bimport\s+pandas\b|\bfrom\s+pandas\s+import\b/,
      },
      {
        name: "matplotlib",
        pattern:
          /\bimport\s+matplotlib\b|\bfrom\s+matplotlib\s+import\b|\bimport\s+matplotlib\.pyplot\b/,
      },
    ];

    checks.forEach((c) => {
      if (c.pattern.test(code)) pkgs.add(c.name);
    });

    return Array.from(pkgs);
  };

  // -----------------------------------------
  // Run Python via Pyodide
  // -----------------------------------------
  runCode = async () => {
    const code = this.state.code || "";

    this.setState({
      error: "",
      errorLine: null,
      consoleOutput: [],
    });

    // Clear existing decorations
    if (this.editorRef && this.monaco && this.decorations.length) {
      this.decorations = this.editorRef.deltaDecorations(this.decorations, []);
    }

    let pyodide;

    try {
      this.setState({ loadingPyodide: true });
      pyodide = await getPyodide();
      this.setState({ pyodideReady: true, loadingPyodide: false });
    } catch (err) {
      this.setState({
        loadingPyodide: false,
        error: err.message || "Failed to load Pyodide.",
      });
      return;
    }

    // Hybrid: detect heavy packages only if needed
    const neededPkgs = this.detectPackages(code).filter(
      (p) => !loadedPackages.has(p)
    );

    if (neededPkgs.length > 0) {
      try {
        this.setState({ loadingPackages: true });
        // pyodide.loadPackage can take array of packages
        await pyodide.loadPackage(neededPkgs);
        neededPkgs.forEach((p) => loadedPackages.add(p));
        this.setState({ loadingPackages: false });
      } catch (err) {
        this.setState({
          loadingPackages: false,
          error:
            "Failed to load packages: " +
            neededPkgs.join(", ") +
            " → " +
            (err.message || err.toString()),
        });
        return;
      }
    }

    // Capture stdout / stderr
    const logs = [];
    const handleStdout = {
      batched: (text) => {
        if (!text) return;
        logs.push({ type: "log", message: String(text) });
      },
    };

    const handleStderr = {
      batched: (text) => {
        if (!text) return;
        logs.push({ type: "error", message: String(text) });
      },
    };

    pyodide.setStdout(handleStdout);
    pyodide.setStderr(handleStderr);

    try {
      // ---------------------------------------------
      // Inject custom input() that uses browser prompt
      // ---------------------------------------------
      pyodide.runPython(`
import builtins
from js import prompt

def _js_input(prompt_text=""):
    response = prompt(prompt_text)
    if response is None:
        return ""
    return response

builtins.input = _js_input
`);

      await pyodide.runPythonAsync(code);

      this.setState({
        consoleOutput: logs.length ? logs : [{ type: "log", message: "" }],
        error: "",
        errorLine: null,
      });
    } catch (err) {
      const msg = err.message || err.toString();
      let line = null;

      // Try to parse "line X" from traceback
      const match = msg.match(/line (\d+)/);
      if (match) {
        const n = Number(match[1]);
        if (!Number.isNaN(n)) line = n;
      }

      this.setState({
        error: msg,
        errorLine: line,
        consoleOutput: logs,
      });

      if (
        line &&
        this.editorRef &&
        this.monaco &&
        Number.isInteger(line)
      ) {
        this.decorations = this.editorRef.deltaDecorations([], [
          {
            range: new this.monaco.Range(line, 1, line, 1),
            options: { isWholeLine: true, className: "bg-red-900/40" },
          },
        ]);
        this.editorRef.revealLineInCenter(line);
      }
    } finally {
      // Optional: reset stdout/stderr if you want
      // pyodide.setStdout();
      // pyodide.setStderr();
    }
  };

  // -----------------------------------------
  // Reset to initial props
  // -----------------------------------------
  resetCode = () => {
    const normalize = (s) => this.normalizeCode(s || "");
    const base = normalize(this.props.initialCode || "");

    this.setState({
      code: base,
      error: "",
      errorLine: null,
      consoleOutput: [],
    });

    if (this.editorRef && this.monaco && this.decorations.length) {
      this.decorations = this.editorRef.deltaDecorations(this.decorations, []);
    }
  };

  // -----------------------------------------
  // Download code
  // -----------------------------------------
  downloadCode = () => {
    const code = this.state.code || "";
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "snippet.py";
    a.click();

    URL.revokeObjectURL(url);
  };

  // -----------------------------------------
  // Render
  // -----------------------------------------
  render() {
    const {
      error,
      consoleOutput,
      editorHeight,
      isFullscreen,
      showLineNumbers,
      autoRun,
      fontSize,
      theme,
      showConsole,
      showFontMenu,
      showThemeMenu,
      code,
      pyodideReady,
      loadingPyodide,
      loadingPackages,
    } = this.state;

    return (
      <div
        className={`border border-slate-700 rounded-xl bg-slate-900 overflow-hidden ${
          isFullscreen ? "fixed inset-0 z-[9999] p-4" : ""
        }`}
      >
        {/* HEADER / TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between bg-slate-800 px-3 py-2 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Braces size={14} />
            Editable Python Code
            {loadingPyodide && (
              <span className="text-[10px] ml-2 text-amber-300">
                (Loading Pyodide…)
              </span>
            )}
            {loadingPackages && (
              <span className="text-[10px] ml-2 text-emerald-300">
                (Loading packages…)
              </span>
            )}
            {pyodideReady && !loadingPyodide && (
              <span className="text-[10px] ml-2 text-emerald-400">
                (Python ready)
              </span>
            )}
          </span>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Lines */}
            <button
              onClick={() =>
                this.setState({ showLineNumbers: !showLineNumbers })
              }
              className="px-2 py-1 rounded bg-indigo-600 text-white flex items-center gap-1"
            >
              <LayoutList size={14} /> Lines
            </button>

            {/* Auto-run */}
            <button
              onClick={() => this.setState({ autoRun: !autoRun })}
              className={`px-2 py-1 rounded ${
                autoRun ? "bg-green-700" : "bg-green-600"
              } text-white flex items-center gap-1`}
            >
              <Play size={14} /> Auto
            </button>

            {/* FONT MENU */}
            <div className="relative">
              <button
                onClick={() =>
                  this.setState({ showFontMenu: !showFontMenu })
                }
                className="px-2 py-1 rounded bg-blue-600 text-white flex items-center gap-1"
              >
                <Type size={14} /> Font
              </button>

              {showFontMenu && (
                <div className="absolute right-0 mt-1 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 p-1 text-xs">
                  {[10, 12, 14, 16, 18, 20, 22, 24].map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        this.setState({
                          fontSize: size,
                          showFontMenu: false,
                        })
                      }
                      className={`w-full text-left px-2 py-1 rounded ${
                        fontSize === size
                          ? "bg-sky-600 text-white"
                          : "text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* THEME MENU */}
            <div className="relative">
              <button
                onClick={() =>
                  this.setState({ showThemeMenu: !showThemeMenu })
                }
                className="px-2 py-1 rounded bg-yellow-600 text-white flex items-center gap-1"
              >
                🎨 Theme
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-1 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 p-1 text-xs">
                  {[
                    { id: "vs-dark", label: "VSCode Dark+" },
                    { id: "vs", label: "VSCode Light+" },
                    { id: "dracula", label: "Dracula" },
                    { id: "one-dark", label: "One Dark Pro" },
                    { id: "solarized-dark", label: "Solarized Dark" },
                    { id: "solarized-light", label: "Solarized Light" },
                    { id: "github-dark", label: "GitHub Dark" },
                    { id: "github-light", label: "GitHub Light" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        this.applyMonacoTheme(t.id);
                        this.setState({
                          theme: t.id,
                          showThemeMenu: false,
                        });
                      }}
                      className={`w-full text-left px-2 py-1 rounded ${
                        theme === t.id
                          ? "bg-sky-600 text-white"
                          : "text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reset */}
            <button
              onClick={this.resetCode}
              className="px-2 py-1 rounded bg-gray-600 text-white flex items-center gap-1"
            >
              <RefreshCw size={14} /> Reset
            </button>

            {/* Fullscreen */}
            <button
              onClick={() =>
                this.setState(
                  (prev) => ({ isFullscreen: !prev.isFullscreen }),
                  () => setTimeout(() => this.editorRef?.layout(), 150)
                )
              }
              className="px-2 py-1 rounded bg-purple-600 text-white flex items-center gap-1"
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              Full
            </button>

            {/* Run */}
            <button
              onClick={this.runCode}
              className="px-2 py-1 rounded bg-emerald-600 text-white flex items-center gap-1"
            >
              <Play size={14} /> Run
            </button>

            {/* Copy */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(code || "");
                alert("Copied!");
              }}
              className="px-2 py-1 rounded bg-slate-600 text-white flex items-center gap-1"
            >
              <Copy size={14} /> Copy
            </button>

            {/* Save */}
            <button
              onClick={this.downloadCode}
              className="px-2 py-1 rounded bg-teal-600 text-white flex items-center gap-1"
            >
              <Download size={14} /> Save
            </button>

            {/* Console */}
            <button
              onClick={() =>
                this.setState({ showConsole: !showConsole })
              }
              className="px-2 py-1 rounded bg-orange-600 text-white flex items-center gap-1"
            >
              {showConsole ? <EyeOff size={14} /> : <Eye size={14} />}
              Console
            </button>
          </div>
        </div>

        {/* MAIN EDITOR */}
        <div className="w-full">
          <Editor
            language="python"
            value={code}
            onChange={(value = "") => this.setState({ code: String(value) })}
            height={editorHeight}
            theme={theme}
            onMount={this.handleEditorDidMount}
            options={{
              fontSize,
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              lineNumbers: showLineNumbers ? "on" : "off",
              padding: { top: 20, bottom: 20 },
            }}
          />
        </div>

        {/* ERROR PANEL */}
        {error && (
          <div className="bg-red-900/40 border-t border-red-700 px-3 py-2 text-red-300 text-xs">
            ⚠ {error}
          </div>
        )}

        {/* CONSOLE PANEL */}
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
                  line.type === "error" ? "text-red-400" : "text-emerald-300"
                }`}
              >
                {line.message}
              </pre>
            ))}
          </div>
        )}
      </div>
    );
  }
}

EditablePythonCodeBlock.defaultProps = {
  initialCode: `print("Hello from Python in Coder & AccoTax!")`,
};
