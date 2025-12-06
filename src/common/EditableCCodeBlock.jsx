// ======================================================
//  EditableCCodeBlock (Upgraded)
//  - No breaking \n escapes
//  - Added Format Button (Clang-Format WASM)
// ======================================================

import React, { Component } from "react";
import Editor from "@monaco-editor/react";

import {
  FileCode,
  Copy,
  Download,
  Maximize2,
  Minimize2,
  RefreshCw,
  Type,
  Play,
  Terminal,
  Wand2,
} from "lucide-react";

import { runCInWasm } from "./wasmCExecutor";

export default class EditableCCodeBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: props.initialCode || "",

      fontSize: 14,
      theme: "vs-dark",
      isFullscreen: false,
      showFontMenu: false,
      showThemeMenu: false,
      editorHeight: 240,

      isRunning: false,
      outputLines: [],
      runtimeError: "",
    };

    this.editorRef = null;
    this.monaco = null;
  }

  // ------------------------------------------
  //  EDITOR MOUNT
  // ------------------------------------------
  handleEditorDidMount = (editor, monaco) => {
    this.editorRef = editor;
    this.monaco = monaco;

    this.updateEditorHeight();
    this.applyTheme(this.state.theme);

    editor.onDidContentSizeChange(() => this.updateEditorHeight());
  };

  updateEditorHeight = () => {
    if (!this.editorRef) return;
    const height = Math.max(this.editorRef.getContentHeight(), 180);
    this.setState({ editorHeight: height }, () => this.editorRef.layout());
  };

  applyTheme = (theme) => {
    if (this.monaco) this.monaco.editor.setTheme(theme);
  };

  // ------------------------------------------
  // ACTIONS
  // ------------------------------------------
  resetCode = () => {
    this.setState({
      code: this.props.initialCode || "",
      outputLines: [],
      runtimeError: "",
    });
  };

  downloadCode = () => {
    const blob = new Blob([this.state.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "program.c";
    a.click();

    URL.revokeObjectURL(url);
  };

  // ------------------------------------------
  //  FORMAT C CODE (CLANG-FORMAT WASM)
  // ------------------------------------------
  formatCode = async () => {
    let source = this.state.code;

    try {
      // Dynamically load clang-format WASM
      const clang = await import("./clang-format.js"); // You will add this file
      const formatted = await clang.formatCode(source, "c");

      this.setState({ code: formatted });
    } catch (e) {
      console.warn("Clang-format not loaded; using backup formatter.");

      // Fallback: VERY simple indentation cleaner (safe)
      const backup = source
        .split("\n")
        .map((line) => line.trimStart())
        .join("\n");

      this.setState({ code: backup });
    }
  };

  // ------------------------------------------
  // RUN CODE VIA WASM ENGINE
  // ------------------------------------------
  handleRun = async () => {
    const { code } = this.state;

    this.setState({
      isRunning: true,
      outputLines: [],
      runtimeError: "",
    });

    try {
      const result = await runCInWasm(code);

      const output = [];

      if (result.stdout) {
        output.push({ type: "out", text: result.stdout });
      }
      if (result.stderr) {
        output.push({ type: "err", text: result.stderr });
      }

      this.setState({ outputLines: output });
    } catch (err) {
      this.setState({ runtimeError: err?.message || String(err) });
    } finally {
      this.setState({ isRunning: false });
    }
  };

  // ------------------------------------------
  // RENDER
  // ------------------------------------------
  render() {
    const {
      code,
      fontSize,
      theme,
      isFullscreen,
      showFontMenu,
      showThemeMenu,
      editorHeight,
      isRunning,
      outputLines,
      runtimeError,
    } = this.state;

    return (
      <div
        className={`border border-slate-700 rounded-xl bg-slate-900 overflow-visible ${
          isFullscreen ? "fixed inset-0 z-[9999] p-4" : ""
        }`}
      >
        {/* ---------------- HEADER ---------------- */}
        <div className="flex flex-wrap items-center justify-between bg-slate-800 px-3 py-2 text-xs relative">
          <span className="text-slate-400 font-semibold flex items-center gap-2">
            <FileCode size={14} /> C Code Editor (WASM Enabled)
          </span>

          <div className="flex flex-wrap items-center gap-2">

            {/* FONT MENU */}
            <div className="relative">
              <button
                onClick={() => this.setState({ showFontMenu: !showFontMenu })}
                className="px-2 py-1 rounded bg-blue-600 text-white flex items-center gap-1"
              >
                <Type size={14} /> Font
              </button>

              {showFontMenu && (
                <div className="absolute right-0 mt-1 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-1 text-xs z-[9999]">
                  {[12, 14, 16, 18, 20, 22].map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        this.setState({ fontSize: size, showFontMenu: false })
                      }
                      className={`w-full px-2 py-1 rounded text-left ${
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
                onClick={() => this.setState({ showThemeMenu: !showThemeMenu })}
                className="px-2 py-1 rounded bg-yellow-600 text-white"
              >
                🎨 Theme
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-1 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-1 text-xs z-[9999]">
                  {[
                    { id: "vs-dark", label: "VSCode Dark" },
                    { id: "vs", label: "VSCode Light" },
                    { id: "dracula", label: "Dracula" },
                    { id: "solarized-dark", label: "Solarized Dark" },
                    { id: "solarized-light", label: "Solarized Light" },
                    { id: "github-dark", label: "GitHub Dark" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        this.applyTheme(t.id);
                        this.setState({
                          theme: t.id,
                          showThemeMenu: false,
                        });
                      }}
                      className={`w-full px-2 py-1 rounded text-left ${
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

            {/* FORMAT BUTTON */}
            <button
              onClick={this.formatCode}
              className="px-2 py-1 rounded bg-indigo-600 text-white flex items-center gap-1"
            >
              <Wand2 size={14} /> Format
            </button>

            {/* RESET */}
            <button
              onClick={this.resetCode}
              className="px-2 py-1 rounded bg-gray-600 text-white flex items-center gap-1"
            >
              <RefreshCw size={14} /> Reset
            </button>

            {/* COPY */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(code);
                alert("Copied!");
              }}
              className="px-2 py-1 rounded bg-slate-600 text-white flex items-center gap-1"
            >
              <Copy size={14} /> Copy
            </button>

            {/* SAVE */}
            <button
              onClick={this.downloadCode}
              className="px-2 py-1 rounded bg-teal-600 text-white flex items-center gap-1"
            >
              <Download size={14} /> Save
            </button>

            {/* RUN */}
            <button
              onClick={this.handleRun}
              disabled={isRunning}
              className={`px-2 py-1 rounded text-white flex items-center gap-1 ${
                isRunning
                  ? "bg-emerald-900 cursor-wait"
                  : "bg-emerald-600 hover:bg-emerald-500"
              }`}
            >
              <Play size={14} />
              {isRunning ? "Running..." : "Run (WASM)"}
            </button>

            {/* FULLSCREEN */}
            <button
              onClick={() =>
                this.setState(
                  (prev) => ({ isFullscreen: !prev.isFullscreen }),
                  () => this.editorRef?.layout()
                )
              }
              className="px-2 py-1 rounded bg-purple-600 text-white flex items-center gap-1"
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              Full
            </button>
          </div>
        </div>

        {/* ---------------- EDITOR ---------------- */}
        <Editor
          language="c"
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
            padding: { top: 18, bottom: 18 },
          }}
        />

        {/* ---------------- OUTPUT ---------------- */}
        <div className="bg-black border-t border-slate-700 px-3 py-2 text-xs h-40 overflow-auto">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Terminal size={12} />
            <span>Program Output</span>
          </div>

          {runtimeError && (
            <pre className="text-red-400 whitespace-pre-wrap mb-2">
              Runtime Error: {runtimeError}
            </pre>
          )}

          {outputLines.length === 0 && !runtimeError && (
            <p className="text-slate-600">No output yet. Click “Run (WASM)”.</p>
          )}

          {outputLines.map((line, idx) => (
            <pre
              key={idx}
              className={`whitespace-pre-wrap ${
                line.type === "err" ? "text-red-400" : "text-green-300"
              }`}
            >
              {line.text}
            </pre>
          ))}
        </div>
      </div>
    );
  }
}

EditableCCodeBlock.defaultProps = {
  initialCode: `#include <stdio.h>

int main() {
    printf("Hello, C from Coder & AccoTax!\\n");
    return 0;
}
`,
};
