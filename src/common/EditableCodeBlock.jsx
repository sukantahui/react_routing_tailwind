import React, { Component } from "react";
import Editor from "@monaco-editor/react";

// Icons
import {
  Braces,
  FileCode,
  FileType,
  Columns,
  Download,
  Copy,
  Maximize2,
  Minimize2,
  RefreshCw,
  Eye,
  EyeOff,
  Wand2,
  Bug,
  Play,
  LayoutList,
  Type,
} from "lucide-react";

export default class EditableCodeBlock extends Component {
  constructor(props) {
    super(props);

    // ============================
    // 🔥 Console listener from iframe
    // ============================
    this._postMessageHandler = (event) => {
      if (!event.data || !event.data.type) return;

      if (event.data.type === "console") {
        this.setState((prev) => ({
          consoleOutput: [
            ...prev.consoleOutput,
            { type: event.data.level || "log", message: event.data.message },
          ],
        }));
      }
    };

    window.addEventListener("message", this._postMessageHandler, false);

    const normalize = (s) => this.normalizeCode(s || "");
    const init = props.initialSnippets || {};

    const initialJS = normalize(init.javascript ?? props.initialCode ?? "");
    const initialHTML = normalize(
      init.html ??
        "<!-- HTML goes here -->\n<div id='app'>Hello from Coder & AccoTax!</div>"
    );
    const initialCSS = normalize(
      init.css ?? "/* CSS goes here */\nbody { font-family: system-ui; }"
    );

    this.state = {
      error: "",
      errorLine: null,
      consoleOutput: [],
      editorHeight: 240,

      isFullscreen: false,
      showLineNumbers: true,
      autoRun: false,
      fontSize: 14,
      theme: "vs-dark",
      showConsole: true,
      showSplitView: false,
      previewCode: "",
      previewKey: Date.now(), // 🔥 Forces iframe remount

      showFontMenu: false,
      showThemeMenu: false,

      activeTab: props.defaultTab || "javascript",

      codes: {
        javascript: initialJS,
        html: initialHTML,
        css: initialCSS,
      },
    };

    this.editorRef = null;
    this.monaco = null;
    this.decorations = [];
    this.previewFrame = null;
  }

  componentWillUnmount() {
    window.removeEventListener("message", this._postMessageHandler, false);
  }

  // ----------------------------------------
  normalizeCode = (str) => {
    return str
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  };

  // ----------------------------------------
  handleEditorDidMount = (editor, monaco) => {
    this.editorRef = editor;
    this.monaco = monaco;

    this.applyMonacoTheme(this.state.theme);
    this.updateEditorHeight();

    editor.onDidContentSizeChange(() => this.updateEditorHeight());

    editor.onDidChangeModelContent(() => {
      if (!this.state.autoRun) return;
      if (this.state.activeTab !== "javascript") return;

      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => this.runCode(), 600);
    });
  };

  updateEditorHeight = () => {
    if (!this.editorRef) return;
    const height = Math.max(this.editorRef.getContentHeight(), 180);
    this.setState({ editorHeight: height }, () => {
      this.editorRef.layout();
    });
  };

  // ----------------------------------------
  applyMonacoTheme = (themeName) => {
    if (!this.monaco) return;

    const themes = {
      dracula: { base: "vs-dark", inherit: true, colors: { "editor.background": "#1e1e2e" } },
      "one-dark": { base: "vs-dark", inherit: true, colors: { "editor.background": "#282c34" } },
      "solarized-dark": { base: "vs-dark", inherit: true, colors: { "editor.background": "#002b36" } },
      "solarized-light": { base: "vs", inherit: true, colors: { "editor.background": "#fdf6e3" } },
      "github-dark": { base: "vs-dark", inherit: true, colors: { "editor.background": "#0d1117" } },
      "github-light": { base: "vs", inherit: true, colors: { "editor.background": "#ffffff" } },
    };

    Object.entries(themes).forEach(([id, def]) =>
      this.monaco.editor.defineTheme(id, def)
    );

    this.monaco.editor.setTheme(themeName);
  };

  // ==========================================================
  // 🔥 FIX: Inject log bridge inside iframe BEFORE running user JS
  // ==========================================================
  updatePreview = () => {
    const { javascript, html, css } = this.state.codes;

    const htmlDoc = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>${css}</style>
        </head>

        <body>
          ${html}

          <!-- ========================= -->
          <!-- JS Console Bridge (works with async) -->
          <!-- ========================= -->
          <script>
            (function() {
              function send(level, args) {
                try {
                  var msg = args.map(a => {
                    try { return typeof a === 'object' ? JSON.stringify(a) : String(a); }
                    catch { return String(a); }
                  }).join(' ');

                  window.parent.postMessage({
                    type: 'console',
                    level: level,
                    message: msg
                  }, '*');
                } catch(e){}
              }

              const oldLog = console.log;
              const oldWarn = console.warn;
              const oldError = console.error;

              console.log = function() { send('log', [...arguments]); oldLog.apply(console, arguments); };
              console.warn = function() { send('warn', [...arguments]); oldWarn.apply(console, arguments); };
              console.error = function() { send('error', [...arguments]); oldError.apply(console, arguments); };
            })();
          </script>

          <!-- ========================= -->
          <!-- User Code -->
          <!-- ========================= -->
          <script>
            try {
              ${javascript}
            } catch (e) {
              window.parent.postMessage({
                type: 'console',
                level: 'error',
                message: String(e)
              }, '*');
            }
          <\/script>
        </body>
      </html>
    `;

    // 🔥 Forces iframe to re-render with fresh JS
    this.setState({
      previewCode: htmlDoc,
      previewKey: Date.now(),
    });
  };
  // ----------------------------------------
  runCode = () => {
    const js = this.state.codes.javascript;

    // reset console output
    this.setState({ error: "", errorLine: null, consoleOutput: [] });

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
      eval(js);
      this.setState({ consoleOutput: captured });
    } catch (err) {
      const match = (err.stack || "").match(/<anonymous>:(\d+):/);
      const line = match ? Number(match[1]) : null;

      this.setState({ error: err.message, errorLine: line });

      if (line && this.editorRef && this.monaco) {
        this.decorations = this.editorRef.deltaDecorations([], [
          {
            range: new this.monaco.Range(line, 1, line, 1),
            options: { isWholeLine: true, className: "bg-red-900/40" },
          },
        ]);
      }
    }

    console.log = originalLog;
    console.error = originalErr;

    if (this.state.showSplitView) this.updatePreview();
  };

  // ----------------------------------------
  lintCode = () => {
    const js = this.state.codes.javascript;
    try {
      new Function(js);
      this.setState({ error: "No syntax errors ✔️", errorLine: null });
    } catch (err) {
      const match = (err.stack || "").match(/<anonymous>:(\d+):/);
      this.setState({
        error: err.message,
        errorLine: match ? Number(match[1]) : null,
      });
    }
  };

  // ----------------------------------------
  formatCode = () => {
    if (this.state.activeTab !== "javascript")
      return this.setState({
        error: "Formatting only works for JavaScript",
        errorLine: null,
      });

    try {
      const prettier = window.prettier;
      const babel = window.prettierPlugins.babel;

      if (!prettier || !babel)
        return this.setState({
          error: "Prettier not loaded",
          errorLine: null,
        });

      const formatted = prettier.format(this.state.codes.javascript, {
        parser: "babel",
        plugins: [babel],
      });

      this.setState((prev) => ({
        codes: { ...prev.codes, javascript: formatted },
        error: "",
        errorLine: null,
      }));
    } catch (err) {
      this.setState({ error: "Format Error: " + err.message });
    }
  };

  // ----------------------------------------
  resetCode = () => {
    const normalize = (s) => this.normalizeCode(s || "");
    const init = this.props.initialSnippets || {};

    this.setState({
      codes: {
        javascript: normalize(
          init.javascript ?? this.props.initialCode ?? ""
        ),
        html: normalize(
          init.html ??
            "<!-- HTML goes here -->\n<div id='app'>Hello from Coder & AccoTax!</div>"
        ),
        css: normalize(
          init.css ??
            "/* CSS goes here */\nbody { font-family: system-ui; }"
        ),
      },
      error: "",
      errorLine: null,
      consoleOutput: [],
    });
  };

  // ----------------------------------------
  downloadCode = () => {
    const { activeTab, codes } = this.state;
    const ext =
      activeTab === "javascript" ? "js" : activeTab === "html" ? "html" : "css";

    const blob = new Blob([codes[activeTab]], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `snippet.${ext}`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // ----------------------------------------
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
      previewKey,
      activeTab,
      codes,
      showFontMenu,
      showThemeMenu,
    } = this.state;

    const editorLanguage =
      activeTab === "html" ? "html" : activeTab === "css" ? "css" : "javascript";

    return (
      <div
        className={`border border-slate-700 rounded-xl bg-slate-900 overflow-visible ${
          isFullscreen ? "fixed inset-0 z-[9999] p-4" : ""
        }`}
      >
        {/* ================= HEADER ================= */}
        <div className="flex flex-wrap items-center justify-between bg-slate-800 px-3 py-2 text-xs z-[9999] relative">
          <span className="text-slate-400 font-semibold">Editable Code</span>

          <div className="flex flex-wrap gap-2 items-center">

            {/* TABS */}
            <div className="flex rounded overflow-hidden border border-slate-700">
              {["javascript", "html", "css"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    this.setState({
                      activeTab: tab,
                      error: "",
                      errorLine: null,
                    })
                  }
                  className={`px-2 py-1 flex items-center gap-1 ${
                    activeTab === tab
                      ? "bg-sky-600 text-white"
                      : "bg-slate-900 text-slate-300"
                  }`}
                >
                  {tab === "javascript" && <Braces size={14} />}
                  {tab === "html" && <FileCode size={14} />}
                  {tab === "css" && <FileType size={14} />}
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* LINE NUMBERS */}
            <button
              onClick={() =>
                this.setState({ showLineNumbers: !showLineNumbers })
              }
              className="px-2 py-1 rounded bg-indigo-600 text-white flex items-center gap-1"
            >
              <LayoutList size={14} /> Lines
            </button>

            {/* AUTO RUN */}
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
                <div className="absolute right-0 mt-1 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-[99999] p-1 text-xs">
                  {[10, 12, 14, 16, 18, 20, 22, 24].map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        this.setState({ fontSize: size, showFontMenu: false })
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
                <div className="absolute right-0 mt-1 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-1 text-xs z-[99999]">
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

            {/* RESET */}
            <button
              onClick={this.resetCode}
              className="px-2 py-1 rounded bg-gray-600 text-white flex items-center gap-1"
            >
              <RefreshCw size={14} /> Reset
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

            {/* FORMAT */}
            <button
              onClick={this.formatCode}
              className="px-2 py-1 rounded bg-sky-600 text-white flex items-center gap-1"
            >
              <Wand2 size={14} /> Format
            </button>

            {/* LINT */}
            <button
              onClick={this.lintCode}
              className="px-2 py-1 rounded bg-amber-600 text-white flex items-center gap-1"
            >
              <Bug size={14} /> Lint
            </button>

            {/* RUN */}
            <button
              onClick={this.runCode}
              className="px-2 py-1 rounded bg-emerald-600 text-white flex items-center gap-1"
            >
              <Play size={14} /> Run
            </button>

            {/* COPY */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(codes[activeTab]);
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

            {/* SPLIT VIEW */}
            <button
              onClick={() =>
                this.setState(
                  (prev) => ({
                    showSplitView: !prev.showSplitView,
                  }),
                  () => this.state.showSplitView && this.updatePreview()
                )
              }
              className="px-2 py-1 rounded bg-cyan-600 text-white flex items-center gap-1"
            >
              <Columns size={14} />
              {showSplitView ? "Hide" : "Split"}
            </button>

            {/* CONSOLE */}
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

        {/* ================= EDITOR + PREVIEW ================= */}
        <div className={`flex w-full ${showSplitView ? "gap-2" : ""}`}>
          <div className={showSplitView ? "w-1/2" : "w-full"}>
            <Editor
              language={editorLanguage}
              value={codes[activeTab]}
              onChange={(value = "") =>
                this.setState((prev) => ({
                  codes: { ...prev.codes, [activeTab]: String(value) },
                }))
              }
              height={editorHeight}
              theme={theme}
              onMount={this.handleEditorDidMount}
              options={{
                fontSize,
                minimap: { enabled: false },
                automaticLayout: true,
                lineNumbers: showLineNumbers ? "on" : "off",
                scrollBeyondLastLine: false,
                padding: { top: 18, bottom: 18 },
              }}
            />
          </div>

          {showSplitView && (
            <div className="w-1/2 border-l border-slate-700 bg-black">
              {/* 🔥 Patched iframe with REMOUNT KEY */}
              <iframe
                key={previewKey}
                title="preview"
                srcDoc={previewCode}
                sandbox="allow-scripts allow-same-origin"
                className="w-full h-full"
                ref={(el) => (this.previewFrame = el)}
              ></iframe>
            </div>
          )}
        </div>
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
                    : line.type === "warn"
                    ? "text-yellow-300"
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
  }
}

EditableCodeBlock.defaultProps = {
  initialCode: "",
  initialSnippets: null,
  defaultTab: "javascript",
};
