import React, { Component } from "react";
import Editor from "@monaco-editor/react";

export default class EditableCodeBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      errorLine: null,
      consoleOutput: [],
      editorHeight: 200,

      // Enhancements
      isFullscreen: false,
      showLineNumbers: true,
      autoRun: false,
      typingTimer: null,
      fontSize: 14,
      theme: "vs-dark",
      showConsole: true,

      // Split view
      showSplitView: false,
      previewCode: "",
    };

    this.editorRef = null;
    this.monaco = null;
    this.decorations = [];
  }

  // ------------------------------------------------------
  // EDITOR MOUNT + AUTO HEIGHT + AUTO RUN
  // ------------------------------------------------------
  handleEditorDidMount = (editor, monaco) => {
    this.editorRef = editor;
    this.monaco = monaco;

    this.updateEditorHeight();

    // Auto-resize on content size change
    editor.onDidContentSizeChange(() => {
      this.updateEditorHeight();
    });

    // Auto-run on content change (with debounce)
    editor.onDidChangeModelContent(() => {
      if (!this.state.autoRun) return;

      clearTimeout(this.state.typingTimer);
      const timer = setTimeout(() => this.runCode(), 1000);
      this.setState({ typingTimer: timer });
    });
  };

  updateEditorHeight = () => {
    if (!this.editorRef) return;

    const contentHeight = this.editorRef.getContentHeight();
    const minHeight = 160;
    const newHeight = Math.max(contentHeight, minHeight);

    if (newHeight !== this.state.editorHeight) {
      this.setState({ editorHeight: newHeight }, () => {
        this.editorRef.layout();
      });
    }
  };

  // ------------------------------------------------------
  // FORMAT ANY VALUE FOR CLEAN CONSOLE OUTPUT
  // ------------------------------------------------------
  formatValue = (value) => {
    try {
      if (typeof value === "object") {
        return JSON.stringify(value, null, 2);
      }
      return String(value);
    } catch {
      return String(value);
    }
  };

  // ------------------------------------------------------
  // UPDATE SPLIT VIEW PREVIEW (IFRAME)
  // ------------------------------------------------------
  updatePreview = () => {
    if (!this.editorRef) return;

    const code = this.editorRef.getValue();

    const html = `
      <html>
        <body style="font-family: monospace; padding: 10px;">
          <script>
            try {
              ${code}
            } catch (err) {
              document.body.innerHTML =
                '<pre style="color:red;">' + err.toString() + '</pre>';
            }
          <\/script>
        </body>
      </html>
    `;

    this.setState({ previewCode: html });
  };

  // ------------------------------------------------------
  // RUN CODE WITH CAPTURED CONSOLE.LOG + ERROR HIGHLIGHT
  // ------------------------------------------------------
  runCode = () => {
    this.setState({ error: "", consoleOutput: [], errorLine: null });

    const captured = [];
    const originalLog = console.log;
    const originalErr = console.error;

    console.log = (...args) => {
      const formatted = args.map(this.formatValue).join(" ");
      captured.push({ type: "log", message: formatted });
      originalLog(...args);
    };

    console.error = (...args) => {
      const formatted = args.map(this.formatValue).join(" ");
      captured.push({ type: "error", message: formatted });
      originalErr(...args);
    };

    try {
      // eslint-disable-next-line no-eval
      eval(this.editorRef.getValue());
      this.setState({ consoleOutput: captured });

      // Clear previous error highlight
      if (this.editorRef && this.decorations.length && this.monaco) {
        this.decorations = this.editorRef.deltaDecorations(
          this.decorations,
          []
        );
      }

      // Update preview for split view
      if (this.state.showSplitView) {
        this.updatePreview();
      }
    } catch (err) {
      const stack = err.stack || "";
      const match = stack.match(/<anonymous>:(\d+):/);
      const line = match ? Number(match[1]) : null;

      this.setState({
        error: "Runtime Error: " + err.message,
        errorLine: line,
      });

      if (line && this.editorRef && this.monaco) {
        this.decorations = this.editorRef.deltaDecorations([], [
          {
            range: new this.monaco.Range(line, 1, line, 1),
            options: {
              isWholeLine: true,
              className: "bg-red-900/30",
            },
          },
        ]);
      }

      // Also show error in preview when split view is ON
      if (this.state.showSplitView) {
        this.updatePreview();
      }
    }

    console.log = originalLog;
    console.error = originalErr;
  };

  // ------------------------------------------------------
  // FORMAT CODE (USING GLOBAL PRETTIER)
  // ------------------------------------------------------
  formatCode = () => {
    try {
      const prettier = window.prettier;
      const babel = window.prettierPlugins.babel;

      const formatted = prettier.format(this.editorRef.getValue(), {
        parser: "babel",
        plugins: [babel],
      });

      this.editorRef.setValue(formatted);
      this.setState({ error: "" });
      this.updateEditorHeight();
    } catch (err) {
      this.setState({ error: "Prettier Error: " + err.message });
    }
  };

  // ------------------------------------------------------
  // COPY CODE TO CLIPBOARD
  // ------------------------------------------------------
  copyCode = () => {
    if (!this.editorRef) return;

    navigator.clipboard
      .writeText(this.editorRef.getValue())
      .then(() => alert("Copied!"));
  };

  // ------------------------------------------------------
  // RESET CODE TO ORIGINAL
  // ------------------------------------------------------
  resetCode = () => {
    if (!this.editorRef) return;

    this.editorRef.setValue(this.props.initialCode);
    this.runCode();
  };

  // ------------------------------------------------------
  // FULLSCREEN MODE
  // ------------------------------------------------------
  toggleFullscreen = () => {
    this.setState({ isFullscreen: !this.state.isFullscreen }, () => {
      setTimeout(() => this.editorRef?.layout(), 100);
    });
  };

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
      showSplitView,
      previewCode,
    } = this.state;

    const { initialCode, language } = this.props;

    return (
      <div
        className={`border border-slate-700 rounded-xl bg-slate-900 overflow-hidden
          ${isFullscreen ? "fixed inset-0 z-[9999] p-4" : ""}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between bg-slate-800 px-3 py-2 text-xs">
          <span className="text-slate-400 font-semibold">Editable Code</span>

          <div className="flex flex-wrap gap-2">
            {/* LINE NUMBER TOGGLE */}
            <button
              onClick={() =>
                this.setState({ showLineNumbers: !showLineNumbers })
              }
              className="px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Lines
            </button>

            {/* AUTO RUN */}
            <button
              onClick={() => this.setState({ autoRun: !autoRun })}
              className={`px-2 py-1 rounded ${
                autoRun ? "bg-emerald-700" : "bg-emerald-600"
              } text-white`}
            >
              Auto
            </button>

            {/* THEME TOGGLE */}
            <button
              onClick={() =>
                this.setState({
                  theme: theme === "vs-dark" ? "light" : "vs-dark",
                })
              }
              className="px-2 py-1 rounded bg-yellow-600 text-white hover:bg-yellow-700"
            >
              Theme
            </button>

            {/* FONT SIZE */}
            <button
              onClick={() =>
                this.setState({ fontSize: Math.min(fontSize + 2, 32) })
              }
              className="px-2 py-1 rounded bg-blue-600 text-white"
            >
              A+
            </button>
            <button
              onClick={() =>
                this.setState({ fontSize: Math.max(fontSize - 2, 8) })
              }
              className="px-2 py-1 rounded bg-blue-600 text-white"
            >
              A-
            </button>

            {/* RESET */}
            <button
              onClick={this.resetCode}
              className="px-2 py-1 rounded bg-gray-600 text-white hover:bg-gray-700"
            >
              Reset
            </button>

            {/* FULLSCREEN */}
            <button
              onClick={this.toggleFullscreen}
              className="px-2 py-1 rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              {isFullscreen ? "Exit" : "Full"}
            </button>

            {/* FORMAT */}
            <button
              onClick={this.formatCode}
              className="px-2 py-1 rounded bg-sky-600 text-white hover:bg-sky-700"
            >
              Format
            </button>

            {/* RUN */}
            <button
              onClick={this.runCode}
              className="px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Run
            </button>

            {/* COPY */}
            <button
              onClick={this.copyCode}
              className="px-2 py-1 rounded bg-slate-600 text-white hover:bg-slate-700"
            >
              Copy
            </button>

            {/* CONSOLE TOGGLE */}
            <button
              onClick={() => this.setState({ showConsole: !showConsole })}
              className="px-2 py-1 rounded bg-orange-600 text-white hover:bg-orange-700"
            >
              Console
            </button>

            {/* SPLIT VIEW TOGGLE */}
            <button
              onClick={() =>
                this.setState(
                  { showSplitView: !showSplitView },
                  () => showSplitView && this.updatePreview()
                )
              }
              className="px-2 py-1 rounded bg-teal-600 text-white hover:bg-teal-700"
            >
              {showSplitView ? "Hide Preview" : "Split View"}
            </button>
          </div>
        </div>

        {/* MAIN AREA: EDITOR + OPTIONAL PREVIEW */}
        <div className={`flex w-full ${showSplitView ? "gap-2" : ""}`}>
          {/* LEFT — CODE EDITOR */}
          <div className={showSplitView ? "w-1/2" : "w-full"}>
            <Editor
              height={editorHeight}
              defaultLanguage={language}
              defaultValue={initialCode}
              theme={theme}
              onMount={this.handleEditorDidMount}
              options={{
                fontSize,
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                lineNumbers: showLineNumbers ? "on" : "off",
                scrollbar: { vertical: "hidden" },
                padding: { top: 20, bottom: 20 },
              }}
            />
          </div>

          {/* RIGHT — LIVE PREVIEW (IF SPLIT VIEW ENABLED) */}
          {showSplitView && (
            <div className="w-1/2 border-l border-slate-700 bg-slate-950">
              <iframe
                title="preview"
                srcDoc={previewCode}
                sandbox="allow-scripts"
                className="w-full h-full"
              ></iframe>
            </div>
          )}
        </div>

        {/* ERROR PANEL */}
        {error && (
          <div className="bg-red-900/40 border-t border-red-600 px-3 py-2 text-red-300 text-xs">
            ⚠ {error}
          </div>
        )}

        {/* CONSOLE OUTPUT PANEL */}
        {showConsole && (
          <div className="bg-black border-t border-slate-700 px-3 py-2 h-40 overflow-auto text-xs">
            <p className="text-slate-400 mb-1">Console Output:</p>

            {consoleOutput.length === 0 && (
              <p className="text-slate-600">No output yet.</p>
            )}

            {consoleOutput.map((item, index) => (
              <pre
                key={index}
                className={`whitespace-pre-wrap ${
                  item.type === "error"
                    ? "text-red-400"
                    : "text-emerald-300"
                }`}
              >
                {item.message}
              </pre>
            ))}
          </div>
        )}
      </div>
    );
  }
}

EditableCodeBlock.defaultProps = {
  initialCode: "",
  language: "javascript",
};
