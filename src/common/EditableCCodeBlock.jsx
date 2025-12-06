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
  Sparkles,
} from "lucide-react";

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
    };

    this.editorRef = null;
    this.monaco = null;
  }

  // ---------------------------- MOUNT ----------------------------
  handleEditorDidMount = (editor, monaco) => {
    this.editorRef = editor;
    this.monaco = monaco;
    this.applyTheme(this.state.theme);
    this.applyFontSize(this.state.fontSize);

    this.updateEditorHeight();
    editor.onDidContentSizeChange(() => this.updateEditorHeight());
  };

  updateEditorHeight = () => {
    if (!this.editorRef) return;
    const height = Math.max(this.editorRef.getContentHeight(), 180);
    this.setState({ editorHeight: height }, () => {
      this.editorRef.layout();
    });
  };

  applyTheme = (theme) => {
    if (!this.monaco) return;
    this.monaco.editor.setTheme(theme);
  };

  applyFontSize = (size) => {
    if (!this.editorRef) return;
    this.editorRef.updateOptions({ fontSize: size });
  };

  // ---------------------------- RESET ----------------------------
  resetCode = () => {
    this.setState({
      code: this.props.initialCode || "",
    });
  };

  // ---------------------------- DOWNLOAD ----------------------------
  downloadCode = () => {
    const blob = new Blob([this.state.code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "program.c";
    a.click();
  };

  // ---------------------------- FORMAT ----------------------------
  formatCode = () => {
    let c = this.state.code;

    // Basic code beautifier
    c = c
      .replace(/\{/g, "{\n")
      .replace(/\}/g, "\n}\n")
      .replace(/;/g, ";\n")
      .replace(/\n\s*\n\s*\n/g, "\n\n");

    this.setState({ code: c });
  };

  // ---------------------------- RENDER UI ----------------------------
  render() {
    const {
      code,
      fontSize,
      theme,
      isFullscreen,
      showFontMenu,
      showThemeMenu,
      editorHeight,
    } = this.state;

    return (
      <div
        className={`border border-slate-700 rounded-xl bg-slate-900 ${
          isFullscreen ? "fixed inset-0 z-[9999] p-4" : ""
        }`}
        style={{ overflow: "visible" }} // FIX: dropdown clipping
      >
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between bg-slate-800 px-3 py-2 text-xs relative z-[5000]">
          <span className="text-slate-400 font-semibold flex items-center gap-2">
            <FileCode size={14} /> C Code Editor
          </span>

          <div className="flex items-center gap-2">

            {/* FONT MENU */}
            <div className="relative">
              <button
                onClick={() => this.setState({ showFontMenu: !showFontMenu })}
                className="px-2 py-1 rounded bg-blue-600 text-white flex items-center gap-1"
              >
                <Type size={14} /> Font
              </button>

              {showFontMenu && (
                <div
                  className="
                    absolute right-0 mt-1 w-32 bg-slate-800 border border-slate-700 
                    rounded-lg p-1 text-xs shadow-xl
                    z-[999999] pointer-events-auto
                  "
                >
                  {[12, 14, 16, 18, 20, 22].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        this.setState({ fontSize: size, showFontMenu: false });
                        this.applyFontSize(size);
                      }}
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
                <div
                  className="
                    absolute right-0 mt-1 w-44 bg-slate-800 border border-slate-700 
                    rounded-lg p-1 text-xs shadow-xl 
                    z-[999999]
                  "
                >
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
                        this.setState({ theme: t.id, showThemeMenu: false });
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
              <Sparkles size={14} /> Format
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

        {/* EDITOR */}
        <Editor
          language="c"
          value={code}
          onChange={(value = "") => this.setState({ code: value })}
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
